import React, {Component} from 'react';
import {connect} from "react-redux";

// Material UI Imports
import * as d3 from "d3";
import * as topojson from "topojson-client";
// Action Imports
import {setTest} from "../../actions/home-actions";
import './tooltip-d3-js-map.css';
import ColorScaleBar from './ColorScaleBar'
import Status from './Status'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prediction: [],
            date: ''
        }
    }

    createMap() {
        const margin = {
            top: 10,
            left: 10,
            bottom: 10,
            right: 10
        };
        let width = parseInt(d3.select("#viz").style("width"));
        width = width - margin.left - margin.right;
        let mapRatio = .5;
        let height = width * mapRatio;
        let mapRatioAdjuster = 50;
        let hongKongCenter = [114.15, 22.33];
        let projection = d3.geo.mercator().center(hongKongCenter).translate([width / 2, height / 2]).scale(width * [mapRatio + mapRatioAdjuster]);
        let zoom = d3.behavior.zoom().translate([0, 0]).scale(1).scaleExtent([1, 20]).on("zoom", () => { features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")") });
        let svg = d3.select("#viz").append("svg").attr("width", width).attr("height", height).call(zoom);
        let path = d3.geo.path().projection(projection);
        let features = svg.append("g");

        d3.select(window).on("resize", () => {
            width = parseInt(d3.select("#viz").style("width"));
            width = width - margin.left - margin.right;
            height = width * mapRatio;
            projection.translate([width / 2, height / 2]).center(hongKongCenter).scale(width * [mapRatio + mapRatioAdjuster]);
            svg.style("width", width + "px").style("height", height + "px");
            svg.selectAll("path").attr("d", path);
        });
        
        d3.json("HKG_adm.json", (t, e) => {
            if (t) return console.error(t);
            topojson.feature(e, e.objects.HKG_adm1_1);
            features.selectAll("path")
                .data(topojson.feature(e, e.objects.HKG_adm1_1).features).enter()
                .append("path").attr("d", path)
                .attr("fill", t => {
                    const name = t.properties.NAME_1.replaceAll(" ", "_").replaceAll("_and_", "_")
                    
                    for (var key in this.state.prediction) {
                        if (this.state.prediction.hasOwnProperty(key) && key.includes(name)) {
                            console.log(this.state.prediction[key].toFixed(2));
                            return this.fillColor(this.state.prediction[key])
                        }
                    }
                    return "#DEEDCF";
                })
                .attr("stroke", "#404040")
                .attr("stroke-width", .2)
                .on("mousemove", t => {
                    d3.select("#tooltip").style("top", d3.event.pageY + 20 + "px")
                        .style("left", d3.event.pageX + 20 + "px")
                        .select("#region-name-tooltip")
                        .text(t.properties.NAME_1);
        
                    d3.select("#tooltip").select("#region-type-tooltip")
                        .text(t.properties.ENGTYPE_1);
        
                    d3.select("#region-name")
                        .text(t.properties.NAME_1);
                    
                    const name = t.properties.NAME_1.replaceAll(" ", "_").replaceAll("_and_", "_")
                    for (var key in this.state.prediction) {
                        if (this.state.prediction.hasOwnProperty(key) && key.includes(name)) {
                            d3.select("#tooltip").select("#region-prediction-tooltip")
                                .text(this.state.prediction[key].toFixed(2));
                        }
                    }

                    d3.select("#region-type")
                        .text(t.properties.ENGTYPE_1 + " (" + t.properties.TYPE_1 + ")");
        
                    d3.select("#tooltip").classed("hidden", !1);
                })
                .on("mouseout", () => {
                    d3.select("#tooltip").classed("hidden", !0);
                })
        });
    }

    fillColor(prediction) {
        if (prediction === 0) return "#ffffcc";
        else if (prediction > 0 && prediction < 500) return "#ffeda0"
        else if (prediction >= 500 && prediction < 1000) return "#fed976"
        else if (prediction >= 1000 && prediction < 1500) return "#feb24c"
        else if (prediction >= 1500 && prediction < 2000) return "#fd8d3c"
        else if (prediction >= 2000 && prediction < 3000) return "#fc4e2a"
        else if (prediction >= 3000 && prediction < 5000) return "#e31a1c"
        else if (prediction >= 5000 && prediction < 7500) return "#bd0026"
        else if (prediction >= 7500) return "#800026"
        else return "#ffffcc";
    }

    getPrediction() {
        fetch("https://asia-east2-covid-19-prediction-in-hk.cloudfunctions.net/get-hk-covid-19-prediction")
        .then(res => res.json())
        .then(
            (results) => {
                const result = results.sort((a, b) => new Date(b.Date.value) - new Date(a.Date.value))[0]
                this.setState({'prediction': result})
                this.setState({'date': result.Date.value})
                this.createMap();
            },
            (error) => {
                console.error(error);
            }
        )
    }

    componentDidMount() {
        this.getPrediction();
    }

    render() {
        return (
            <div>
                <ColorScaleBar/>
                <Status lastUpdateDate={this.state.date}/>
                <div id="tooltip" className="hidden">
                    <div><strong>Region:</strong> <span id="region-name-tooltip"></span></div>
                    <div><strong>Predicted next 14 day activities by confirmed case:</strong> <span id="region-prediction-tooltip"></span></div>
                </div>
                <div id="viz"/>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {...state,...props};
};

const mapDispatchToProps = {
    setTest
};

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);