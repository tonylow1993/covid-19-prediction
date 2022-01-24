import React, {Component} from 'react';
import {connect} from "react-redux";

// Material UI Imports
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import * as d3 from "d3";
import * as topojson from "topojson-client";
// Action Imports
import {setTest} from "../../actions/home-actions";
import './tooltip-d3-js-map.css';

class HomePage extends Component {
    createMap()
    {
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
        let mapRatioAdjuster = 40;
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
                .attr("fill", "#e8d8c3")
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
                    for (var key in this.state) {
                        if (this.state.hasOwnProperty(key) && key.includes(name)) {
                            d3.select("#tooltip").select("#region-prediction-tooltip")
                                .text(this.state[key]);
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

    getPrediction()
    {
        fetch("https://asia-east2-covid-19-prediction-in-hk.cloudfunctions.net/get-hk-covid-19-prediction")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState(result[0])
                console.log(result);
            },
            (error) => {
                console.error(error);
            }
        )
    }

    componentDidMount()
    {
        this.getPrediction();
        this.createMap();
    }

    render() {
        return (
            <div>
                <div id="tooltip" className="hidden">
                    <div><strong>Region:</strong> <span id="region-name-tooltip">100</span></div>
                    <div><strong>Type:</strong> <span id="region-type-tooltip">200</span></div>
                    <div><strong>Prediction:</strong> <span id="region-prediction-tooltip">300</span></div>
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