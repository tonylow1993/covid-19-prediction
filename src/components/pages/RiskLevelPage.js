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

class RiskLevelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prediction: [],
            loading: true
        }
        this.getPrediction();
    }

    getRiskLevel(predictedNo) {
        if (predictedNo > 100) {
            return 'Very high'
        } else if (predictedNo >= 50 && predictedNo < 100) {
            return 'High'
        } else if (predictedNo >= 20 && predictedNo < 50) {
            return 'Moderate'
        } else if (predictedNo < 20) {
            return 'Low'
        }
        return 'N/A'
    }

    getPrediction() {
        fetch("https://asia-east2-covid-19-prediction-in-hk.cloudfunctions.net/get-hk-covid-19-prediction")
        .then(res => res.json())
        .then(
            (results) => {
                const result = results.find(result => result.Date.value === '2022-02-01')
                const prediction = Object.keys(result).filter(key => key.startsWith('Res')).sort((a, b) => {
                    return result[b] - result[a] 
                }).map((key, index) => ({
                    rank: index + 1,
                    district: key.replace('Res_', '').replace('_next14', '').replaceAll('_', ' '),
                    number: result[key],
                    riskLevel: this.getRiskLevel(result[key])
                }));
                console.log(prediction)
                this.setState({'prediction': prediction, 'loading': false})
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

        return (
            this.state.loading ? 
            <CircularProgress style={progressStyle}/> :
            <div style={divStyle}>
                <TableContainer style={tableStyle} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="case-details">
                        <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell align="right">District</TableCell>
                            <TableCell align="right">Predicted number of cases in next 14 days</TableCell>
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
                            <TableCell align="right">{row.number.toFixed(2)}</TableCell>
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