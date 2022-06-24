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

class CaseDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cases: [],
            loading: true
        }
        this.getCaseDetails();
    }

    getCaseDetails() {
        fetch("https://asia-east2-covid-19-prediction-in-hk.cloudfunctions.net/get-hk-covid-19-case-details?date=2022-02-01")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({'cases': result})
                this.setState({'loading': false})
                console.log(result);
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

        return (
            this.state.loading ? 
            <CircularProgress style={progressStyle}/> :
            <div style={divStyle}>
                <TableContainer style={tableStyle} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="case-details">
                        <TableHead>
                        <TableRow>
                            <TableCell>Case No.</TableCell>
                            <TableCell align="right">Report Date</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Classification</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.cases.map((row) => (
                            <TableRow
                            key={row.Case_no_}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.Case_no_}
                            </TableCell>
                            <TableCell align="right">{row.Report_date.value}</TableCell>
                            <TableCell align="right">{row.Age}</TableCell>
                            <TableCell align="right">{row.Gender}</TableCell>
                            <TableCell align="right">{row.Classification_}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
        );
    }
};

export default CaseDetailsPage;