import React, {Component} from 'react';
// Material UI Imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MenuProps, useStyles, options } from "../utils";

class RiskLevelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prediction: [],
            loading: true,
            selected: ["Deep Neural Network"],
        }
        this.getPrediction();
    }

    groupBy(xs, key) {
        return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    getRiskLevel(predictedNo) {
        if (predictedNo > 5000) {
            return 'Very high'
        } else if (predictedNo >= 2500 && predictedNo < 5000) {
            return 'High'
        } else if (predictedNo >= 1000 && predictedNo < 2500) {
            return 'Moderate'
        } else if (predictedNo < 1000) {
            return 'Low'
        }
        return 'N/A'
    }

    getPrediction() {
        fetch("https://asia-east2-covid-19-prediction-in-hk.cloudfunctions.net/get-hk-covid-19-prediction")
        .then(res => res.json())
        .then(
            (results) => {
                const result = results.sort((a, b) => new Date(b.Date.value) - new Date(a.Date.value))[0]
                const prediction = Object
                .keys(result)
                .filter(r => !r.includes('Measure') && !r.includes('Date') && !r.includes('Confirmed'))
                .map((key, index) => ({
                    district: key.replace('_next14', '').replace('_lr', '').replace('_btr', '').replace('_dnnr', '').replaceAll('_', ' '),
                    type: key.includes('lr') ? 'lr' : key.includes('dnnr') ? 'dnnr' : 'btr',
                    number: result[key],
                }));
                const grouped = this.groupBy(prediction, 'district')
                const allPrediction = Object
                .keys(grouped)
                .map(key => ({
                    district: key,
                    lr: grouped[key][0].number,
                    dnnr: grouped[key][1].number,
                    btr: grouped[key][2].number,
                    number: grouped[key][1].number,
                }))
                .sort((a, b) => b.number - a.number)
                .map((p, i) => ({...p, rank: i + 1,riskLevel: this.getRiskLevel(p.number)}))
                this.setState({'prediction': allPrediction, 'loading': false})
            },
            (error) => {
                console.error(error);
            }
        )
    }

    render() {
        const divStyle = {
            padding: '24px',
            backgroundColor: '#E7EBF0'
        }

        const tableStyle = {
            borderRadius: '8px',
            backgroundColor: '#FFFFFF'
        }

        const progressStyle = {
            display: 'flex',
            margin: 'auto',
            marginTop: '50px',
            backgroundColor: 'transparent'
        }

        const handleChange = (event) => {
            let value = event.target.value;
            if (value[value.length - 1] === "all") {
                this.setState({'selected': this.state.selected.length === options.length ? [] : options});
                value = options
            } else {
                this.setState({'selected': value});
            }
            const prediction = this.state.prediction
            this.setState({'prediction': prediction
                .map(p => ({
                    ...p, 
                    number: ((value.includes("Linear Regression") ? p.lr : 0) + (value.includes("Deep Neural Network") ? p.dnnr : 0) + (value.includes("XGBoost") ? p.btr : 0)) / value.length
                }))
                .sort((a, b) => b.number - a.number)
                .map((p, i) => ({...p, rank: i + 1,riskLevel: this.getRiskLevel(p.number)}))
            });
        };

        const classes = useStyles;
        const isAllSelected = options.length > 0 && this.state.selected.length === options.length;

        return (
            this.state.loading ? 
            <CircularProgress style={progressStyle}/> :
            <div style={divStyle}>
                <FormControl className={classes.formControl} style={{width:"350px", marginBottom:"20px"}}>
                    <InputLabel id="mutiple-select-label">Select Model</InputLabel>
                    <Select
                        labelId="mutiple-select-label"
                        multiple
                        value={this.state.selected}
                        onChange={handleChange}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                    >
                        <MenuItem
                        value="all"
                        classes={{
                            root: isAllSelected ? classes.selectedAll : ""
                        }}
                        >
                        <ListItemIcon>
                            <Checkbox
                            classes={{ indeterminate: classes.indeterminateColor }}
                            checked={isAllSelected}
                            indeterminate={
                                this.state.selected.length > 0 && this.state.selected.length < options.length
                            }
                            />
                        </ListItemIcon>
                        <ListItemText
                            classes={{ primary: classes.selectAllText }}
                            primary="Select All"
                        />
                        </MenuItem>
                        {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            <ListItemIcon>
                            <Checkbox checked={this.state.selected.indexOf(option) > -1} />
                            </ListItemIcon>
                            <ListItemText primary={option} />
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TableContainer style={tableStyle} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="case-details">
                        <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell align="right">District</TableCell>
                            {this.state.selected.includes("Linear Regression") && <TableCell align="right">Prediction (LR)</TableCell>}
                            {this.state.selected.includes("Deep Neural Network") && <TableCell align="right">Prediction (DNN)</TableCell>}
                            {this.state.selected.includes("XGBoost") && <TableCell align="right">Prediction (XGBoost)</TableCell>}
                            <TableCell align="right">Risk Level</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.prediction.map((row) => (
                            <TableRow
                            key={row.rank}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.rank}
                            </TableCell>
                            <TableCell align="right">{row.district}</TableCell>
                            {this.state.selected.includes("Linear Regression") && <TableCell align="right">{row.lr.toFixed(2)}</TableCell>}
                            {this.state.selected.includes("Deep Neural Network") && <TableCell align="right">{row.dnnr.toFixed(2)}</TableCell>}
                            {this.state.selected.includes("XGBoost") && <TableCell align="right">{row.btr.toFixed(2)}</TableCell>}
                            <TableCell align="right">{row.riskLevel}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
        );
    }
};

export default RiskLevelPage;