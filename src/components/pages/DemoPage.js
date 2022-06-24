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
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
  } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

class DemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cases: [],
            loading: true
        }
        ChartJS.register(
            ArcElement,
            CategoryScale,
            LinearScale,
            BarElement,
            Title,
            Tooltip,
            Legend,
            PointElement,
            LineElement,
          );
        this.getCaseDetails();
    }

    getCaseDetails() {
        fetch("https://asia-east2-covid-19-prediction-in-hk.cloudfunctions.net/get-hk-covid-19-case-details?date=2022-02-01")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({'cases': result.sort((a, b) => b.Case_no_ - a.Case_no_)})
                this.setState({'loading': false})
            },
            (error) => {
                this.setState({'loading': false})
                console.error(error);
            }
        )
    }

    render() {
        const progressStyle = {
            display: 'flex',
            margin: 'auto',
            marginTop: '50px',
            backgroundColor: 'transparent'
        }

        const pieData = {
            labels: ['Male', 'Female'],
            datasets: [
              {
                label: 'Gender',
                data: [this.state.cases.filter(c => c.Gender === 'M').length, this.state.cases.filter(c => c.Gender === 'F').length],
                backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
              }
            ]
        }

        const options1 = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Gender & Age Group Distribution',
            },
          },
        };

        const options2 = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Gender Distribution',
            },
          },
        };

        const options3 = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Import vs Local Case Trend',
            },
          },
        };
        
        const barData = {
          labels: ['< 20', '20 - 30', '30 - 40', '40 - 50', '50 - 60', '> 60'],
          datasets: [
            {
              label: 'Male',
              data: [
                this.state.cases.filter(c => c.Gender === 'M' && c.Age < 20).length, 
                this.state.cases.filter(c => c.Gender === 'M' && c.Age >= 20 && c.Age < 30).length, 
                this.state.cases.filter(c => c.Gender === 'M' && c.Age >= 30 && c.Age < 40).length, 
                this.state.cases.filter(c => c.Gender === 'M' && c.Age >= 40 && c.Age < 50).length, 
                this.state.cases.filter(c => c.Gender === 'M' && c.Age >= 50 && c.Age < 60).length, 
                this.state.cases.filter(c => c.Gender === 'M' && c.Age > 60).length
              ],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Female',
              data: [
                this.state.cases.filter(c => c.Gender === 'F' && c.Age < 20).length, 
                this.state.cases.filter(c => c.Gender === 'F' && c.Age >= 20 && c.Age < 30).length, 
                this.state.cases.filter(c => c.Gender === 'F' && c.Age >= 30 && c.Age < 40).length, 
                this.state.cases.filter(c => c.Gender === 'F' && c.Age >= 40 && c.Age < 50).length, 
                this.state.cases.filter(c => c.Gender === 'F' && c.Age >= 50 && c.Age < 60).length, 
                this.state.cases.filter(c => c.Gender === 'F' && c.Age > 60).length
              ],
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        };

        const lineData = {
          labels: ['18/1', '19/1', '20/1', '21/1', '22/1', '23/1', '24/1', '25/1', '26/1', '27/1', '28/1', '29/1', '30/1', '31/1', '1/2'],
          datasets: [
            {
              label: 'Import Case',
              data: [
                this.state.cases.filter(c => c.Report_date.value === '2022-01-18' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-19' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-20' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-21' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-22' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-23' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-24' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-25' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-26' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-27' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-28' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-29' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-30' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-31' && c.Classification_.toLowerCase().includes('import')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-02-01' && c.Classification_.toLowerCase().includes('import')).length,
              ],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Local case',
              data: [
                this.state.cases.filter(c => c.Report_date.value === '2022-01-18' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-19' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-20' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-21' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-22' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-23' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-24' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-25' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-26' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-27' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-28' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-29' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-30' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-01-31' && c.Classification_.toLowerCase().includes('local')).length,
                this.state.cases.filter(c => c.Report_date.value === '2022-02-01' && c.Classification_.toLowerCase().includes('local')).length,
              ],
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        };
        
        return (
            this.state.loading ? 
            <CircularProgress style={progressStyle}/> 
            : 
            <Grid container spacing={4}>
              <Grid item xs={8}>
                <Paper className='paper'>
                  <Bar options={options1} data={barData} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className='paper'>
                  <Pie options={options2} data={pieData} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className='paper'>
                  <Line options={options3} data={lineData} />
                </Paper>
              </Grid>
            </Grid>
        );
    }
};

export default DemoPage;