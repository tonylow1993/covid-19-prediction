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

class PHSMPage extends Component {
    constructor(props) {
        const prediction = [
            {
                phsmCode: '1.4',
                phsm: 'Wearing a mask',
                status: 'Active',
                withoutMeasure: 120.12,
            },
            {
                phsmCode: '1.6',
                phsm: 'Physical distancing',
                status: 'Active',
                withoutMeasure: 188.71,
            },
            {
                phsmCode: '5.1',
                phsm: 'Providing travel advice or warning',
                status: 'Active',
                withoutMeasure: 119.04,
            },
            {
                phsmCode: '5.3',
                phsm: 'Restricting entry',
                status: 'Active',
                withoutMeasure: 216.85,
            },
            {
                phsmCode: '5.5',
                phsm: 'Entry screening and isolation or quarantine',
                status: 'Active',
                withoutMeasure: 115.95,
            },
            {
                phsmCode: '5.7',
                phsm: 'Suspending or restricting international flights',
                status: 'Active',
                withoutMeasure: 185.34,
            },
            {
                phsmCode: '5.8',
                phsm: 'Suspending or restricting international ferries or ships',
                status: 'Active',
                withoutMeasure: 161.97,
            },
            {
                phsmCode: '5.9',
                phsm: 'Closing international land borders',
                status: 'Active',
                withoutMeasure: 139.52,
            },
            {
                phsmCode: '6.2',
                phsm: 'Using medications for treatment',
                status: 'Active',
                withoutMeasure: 144.86,
            },
            {
                phsmCode: '7.2',
                phsm: 'Using vaccines for prevention',
                status: 'Active',
                withoutMeasure: 177.66,
            },
            {
                phsmCode: '8.1',
                phsm: 'Legal and policy regulations',
                status: 'Active',
                withoutMeasure: 121.12,
            },
            {
                phsmCode: '8.2',
                phsm: 'Scaling up',
                status: 'Active',
                withoutMeasure: 127.47,
            },
            {
                phsmCode: '8.3',
                phsm: 'Financial packages',
                status: 'Active',
                withoutMeasure: 115.95,
            },
            {
                phsmCode: '8.4',
                phsm: 'Communications and engagement',
                status: 'Active',
                withoutMeasure: 119.33,
            },
            {
                phsmCode: '3.1.1',
                phsm: 'Passive case detection',
                status: 'Active',
                withoutMeasure: 117.36,
            },
            {
                phsmCode: '3.1.2',
                phsm: 'Active case detection',
                status: 'Active',
                withoutMeasure: 116.29,
            },
            {
                phsmCode: '3.1.3',
                phsm: 'Isolation',
                status: 'Phase-out',
                withoutMeasure: 115.95,
            },
            {
                phsmCode: '3.2.1',
                phsm: 'Contact tracing',
                status: 'Active',
                withoutMeasure: 120.20,
            },
            {
                phsmCode: '3.2.2',
                phsm: 'Quarantine of contacts',
                status: 'Active',
                withoutMeasure: 132.30,
            },
            {
                phsmCode: '4.1.1',
                phsm: 'School measures - Adapting',
                status: 'Phase-out',
                withoutMeasure: 115.95,
            },
            {
                phsmCode: '4.1.2',
                phsm: 'School measures - Closing',
                status: 'Phase-out',
                withoutMeasure: 115.95,
            },
            {
                phsmCode: '4.2.1',
                phsm: 'Social and physical distancing measures - Adapting',
                status: 'Active',
                withoutMeasure: 139.61,
            },
            {
                phsmCode: '4.2.2',
                phsm: 'Social and physical distancing measures - Closing',
                status: 'Phase-out',
                withoutMeasure: 115.95,
            },
            {
                phsmCode: '4.3.1',
                phsm: 'Restricting private gatherings at home',
                status: 'Active',
                withoutMeasure: 130.09,
            },
            {
                phsmCode: '4.3.2',
                phsm: 'Cancelling, restricting or adapting private gatherings outside the home',
                status: 'Active',
                withoutMeasure: 254.14,
            },
            {
                phsmCode: '4.3.3',
                phsm: 'Cancelling, closing, restricting or adapting public gatherings outside the home',
                status: 'Active',
                withoutMeasure: 115.95,
            },
            {
                phsmCode: '4.3.4',
                phsm: 'Cancelling, restricting or adapting mass gatherings',
                status: 'Phase-out',
                withoutMeasure: 115.95,
            },
            {
                phsmCode: '4.4.1',
                phsm: 'Shielding vulnerable groups',
                status: 'Active',
                withoutMeasure: 132.59,
            },
            {
                phsmCode: '4.4.2',
                phsm: 'Protecting populations in closed settings',
                status: 'Active',
                withoutMeasure: 116.64,
            },
            {
                phsmCode: '4.5.1',
                phsm: 'Suspending or restricting movement',
                status: 'Active',
                withoutMeasure: 149.30,
            },
            {
                phsmCode: '4.5.2',
                phsm: 'Stay-at-home order',
                status: 'Active',
                withoutMeasure: 189.01,
            },
            {
                phsmCode: '4.5.3',
                phsm: 'Restricting entry',
                status: 'Active',
                withoutMeasure: 155.23,
            },
            {
                phsmCode: '8.4.1',
                phsm: 'General public awareness campaigns',
                status: 'Active',
                withoutMeasure: 115.99,
            },
        ]
        super(props);
        this.state = {
            prediction: prediction.sort((a, b) => b.withoutMeasure - a.withoutMeasure).map((p, i) => ({rank: i + 1, ...p})),
            loading: false
        }
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
                    <Table sx={{ minWidth: 650 }} aria-label="phsm">
                        <TableHead>
                        <TableRow>
                            <TableCell>Effectiveness</TableCell>
                            <TableCell>Measure</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Predicted number of cases without measure</TableCell>
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
                            <TableCell>{`${row.phsmCode} ${row.phsm}`}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">{row.withoutMeasure.toFixed(2)}</TableCell>
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