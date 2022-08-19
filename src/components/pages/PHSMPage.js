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

class PHSMPage extends Component {
    constructor(props) {
        const phsm = [
            {
                phsmCode: '1.4',
                phsm: 'Wearing a mask',
                status: 'Active',
            },
            {
                phsmCode: '5.3',
                phsm: 'Restricting entry',
                status: 'Active',
            },
            {
                phsmCode: '5.5',
                phsm: 'Entry screening and isolation or quarantine',
                status: 'Active',
            },
            {
                phsmCode: '5.7',
                phsm: 'Suspending or restricting international flights',
                status: 'Active',
            },
            {
                phsmCode: '7.2',
                phsm: 'Using vaccines for prevention',
                status: 'Active',
            },
            {
                phsmCode: '8.1',
                phsm: 'Legal and policy regulations',
                status: 'Active',
            },
            {
                phsmCode: '3.1.1',
                phsm: 'Passive case detection',
                status: 'Active',
            },
            {
                phsmCode: '3.1.2',
                phsm: 'Active case detection',
                status: 'Active',
            },
            {
                phsmCode: '3.2.1',
                phsm: 'Contact tracing',
                status: 'Active',
            },
            {
                phsmCode: '4.1.1',
                phsm: 'School measures - Adapting',
                status: 'Phase-out',
            },
            {
                phsmCode: '4.1.2',
                phsm: 'School measures - Closing',
                status: 'Phase-out',
            },
            {
                phsmCode: '4.2.1',
                phsm: 'Social and physical distancing measures - Adapting',
                status: 'Active',
            },
            {
                phsmCode: '4.2.2',
                phsm: 'Social and physical distancing measures - Closing',
                status: 'Phase-out',
            },
            {
                phsmCode: '4.3.2',
                phsm: 'Cancelling, restricting or adapting private gatherings outside the home',
                status: 'Active',
            },
            {
                phsmCode: '4.3.3',
                phsm: 'Cancelling, closing, restricting or adapting public gatherings outside the home',
                status: 'Active',
            },
            {
                phsmCode: '4.3.4',
                phsm: 'Cancelling, restricting or adapting mass gatherings',
                status: 'Phase-out',
            },
            {
                phsmCode: '4.5.1',
                phsm: 'Suspending or restricting movement',
                status: 'Active',
            },
            {
                phsmCode: '4.5.2',
                phsm: 'Stay-at-home order',
                status: 'Active',
            }
        ]
        super(props);
        this.state = {
            prediction: [],
            selected: ["Deep Neural Network"],
            phsm,
            loading: false
        }
        this.getPrediction();
    }

    getPrediction() {
        fetch("https://asia-east2-covid-19-prediction-in-hk.cloudfunctions.net/get-hk-covid-19-prediction")
        .then(res => res.json())
        .then(
            (result) => {
                const keys = Object.keys(result[0])
                const prediction = this.state.phsm.map(p => {
                    keys.map(key => {
                        if (key.includes(`Measure_${p.phsmCode.replaceAll('.', '_')}`)) {
                            if (key.includes('lr')){
                                p.lr = result[0][key].toFixed(0)
                            } else if (key.includes('dnnr')){
                                p.dnnr = result[0][key].toFixed(0)
                            } else if (key.includes('btr')){
                                p.btr = result[0][key].toFixed(0)
                            }
                        }
                        p.number = p.dnnr
                    })
                    return p
                })
                .sort((a, b) => b.number - a.number)
                .map((p, i) => ({...p, rank: i + 1}))
                this.setState({'prediction': prediction})
                this.setState({'loading': false})
            },
            (error) => {
                this.setState({'loading': false})
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
                .map((p, i) => ({...p, rank: i + 1}))
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
                    <Table sx={{ minWidth: 650 }} aria-label="phsm">
                        <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell>Code</TableCell>
                            <TableCell>Measure</TableCell>
                            <TableCell>Status</TableCell>
                            {this.state.selected.includes("Linear Regression") && <TableCell>Without Measure (LR)</TableCell>}
                            {this.state.selected.includes("Deep Neural Network") && <TableCell><b>Without Measure (DNNR)</b></TableCell>}
                            {this.state.selected.includes("XGBoost") && <TableCell>Without Measure (XGBoost)</TableCell>}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.prediction.map((row) => (
                            <TableRow
                            key={row.phsmCode}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell>{row.rank}</TableCell>
                            <TableCell>{row.phsmCode}</TableCell>
                            <TableCell>{row.phsm}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            {this.state.selected.includes("Linear Regression") && <TableCell>{row.lr}</TableCell>}
                            {this.state.selected.includes("Deep Neural Network") && <TableCell><b>{row.dnnr}</b></TableCell>}
                            {this.state.selected.includes("XGBoost") && <TableCell>{row.btr}</TableCell>}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
        );
    }
};

export default PHSMPage;