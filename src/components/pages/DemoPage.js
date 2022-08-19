import React, {Component} from 'react';
// Material UI Imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
            prediction: [],
            vaccination: [],
            stats: [],
            worldStats: [],
            confirm14: 0,
            death14: 0,
            cumulativeConfirm: 0,
            rt: [],
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
        this.getVaccination();
        this.getStats();
        this.getWorldStats();
        this.getRt();
        this.getPrediction();
    }

    getStats() {
        fetch("https://asia-east2-covid-19-prediction-in-hk.cloudfunctions.net/get-hk-covid-19-stats")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({'stats': result.sort((a, b) => new Date(a.As_of_date.value) - new Date(b.As_of_date.value))})
                this.setState({'loading': false})
            },
            (error) => {
                this.setState({'loading': false})
                console.error(error);
            }
        )
    }

    getWorldStats() {
      fetch("https://asia-east2-covid-19-prediction-in-hk.cloudfunctions.net/get-hk-covid-19-world-stats ")
      .then(res => res.json())
      .then(
          (result) => {
              this.setState({'worldStats': result})
              this.setState({'confirm14': result[0].Number_of_newly_confirmed_cases_reported_in_the_past_14_days})
              this.setState({'death14': result[0].Cumulative_number_of_deaths_among_confirmed_cases - result[13].Cumulative_number_of_deaths_among_confirmed_cases})
              this.setState({'cumulativeConfirm': result[0].Cumulative_number_of_confirmed_cases})
              this.setState({'loading': false})
          },
          (error) => {
              this.setState({'loading': false})
              console.error(error);
          }
      )
  }

    getVaccination() {
      fetch("https://asia-east2-covid-19-prediction-in-hk.cloudfunctions.net/get-hk-covid-19-vaccination")
        .then(res => res.json())
        .then(
          (result) => {
              this.setState({'vaccination': result.sort((a, b) => new Date(a.date.value) - new Date(b.date.value))})
              this.setState({'loading': false})
          },
          (error) => {
              this.setState({'loading': false})
              console.error(error);
          }
        )
    }

    getRt() {
      fetch("https://asia-east2-covid-19-prediction-in-hk.cloudfunctions.net/get-hk-covid-19-Rt")
        .then(res => res.json())
        .then(
          (result) => {
              this.setState({'rt': result.filter(rt => rt.Rt !== 'null').sort((a, b) => new Date(a.Date.value) - new Date(b.Date.value))})
              this.setState({'loading': false})
          },
          (error) => {
              this.setState({'loading': false})
              console.error(error);
          }
        )
    }

    getPrediction() {
      fetch("https://asia-east2-covid-19-prediction-in-hk.cloudfunctions.net/get-hk-covid-19-prediction")
        .then(res => res.json())
        .then(
          (result) => {
              const prediction = result.map(r => ({
                Date: r.Date,
                Confirmed_case_next14_lr: r.Confirmed_case_next14_lr.toFixed(0),
                Confirmed_case_next14_dnnr: r.Confirmed_case_next14_dnnr.toFixed(0),
                Confirmed_case_next14_btr: r.Confirmed_case_next14_btr.toFixed(0),
              }))
              this.setState({'prediction': prediction.sort((a, b) => new Date(a.Date.value) - new Date(b.Date.value)).slice(0, 30)})
              this.setState({'loading': false})
          },
          (error) => {
              this.setState({'loading': false})
              console.error(error);
          }
        )
    }

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        const progressStyle = {
            display: 'flex',
            margin: 'auto',
            marginTop: '50px',
            backgroundColor: 'transparent'
        }

        const lineOptionVaccination = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Vaccinations in Past 30 Days',
              font: {
                size: 20
              }
            },
          },
        };

        const lineOptionCase = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Cumulative Positive Cases in Past 30 Days',
              font: {
                size: 20
              }
            },
          },
        };

        const lineOptionRt = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Effective Production Number (Rt) in Past 30 Days',
              font: {
                size: 20
              }
            },
          },
        };

        const lineOptionPrediction = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Predicted vs Actual Confirmed Cases in Next 14 Days',
              font: {
                size: 20
              }
            },
          },
        };
        
        const lineDataVaccination = {
          labels: this.state.vaccination.map(v => v.date.value),
          datasets: [
            /*{
              label: 'Total Vaccinations',
              data: this.state.vaccination.map(v => v.total_vaccinations),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132)',
            },*/
            {
              label: 'Population Vaccinated',
              data: this.state.vaccination.map(v => v.people_vaccinated),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235)',
            },
            {
              label: 'Population with Booster',
              data: this.state.vaccination.map(v => v.total_boosters),
              borderColor: 'rgb(35, 161, 53)',
              backgroundColor: 'rgb(35, 161, 53)',
            },
          ],
        };

        const lineDataCase = {
          labels: this.state.stats.map(v => v.As_of_date.value),
          datasets: [
            {
              label: 'Nucleic Acid Test',
              data: this.state.stats.map(v => v.Number_of_positive_case_NC),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132)',
            },
            {
              label: 'Rapid Antigen Test',
              data: this.state.stats.map(v => v.Number_of_positive_case_RAT),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235)',
            },
          ],
        };

        const lineDataRt = {
          labels: this.state.rt.map(v => v.Date.value),
          datasets: [
            {
              label: 'Effective Reproduction Number (Rt)',
              data: this.state.rt.map(v => v.Rt),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132)',
            },
          ],
        };

        const index = this.state.worldStats.findIndex(stat => stat.As_of_date.value === '2022-07-22')
        const lineDataPrediction = {
          labels: this.state.prediction.map(p => p.Date.value),
          datasets: [
            {
              label: 'Predicted Confirmed Cases (LR)',
              data: this.state.prediction.map(p => p.Confirmed_case_next14_lr),
              borderColor: 'rgb(255, 255, 0)',
              backgroundColor: 'rgba(255, 255, 0)',
            },
            {
              label: 'Predicted Confirmed Cases (DNNR)',
              data: this.state.prediction.map(p => p.Confirmed_case_next14_dnnr),
              borderColor: 'rgb(0, 0, 255)',
              backgroundColor: 'rgba(0, 0, 255)',
            },
            {
              label: 'Predicted Confirmed Cases (XGBoost)',
              data: this.state.prediction.map(p => p.Confirmed_case_next14_btr),
              borderColor: 'rgb(0, 255, 255)',
              backgroundColor: 'rgba(0, 255, 255)',
            },
            {
              label: 'Actual Confirmed Cases',
              data: this.state.worldStats.slice(index, index + 30).sort((a, b) => new Date(a.As_of_date.value) - new Date(b.As_of_date.value)).map(p => p.Number_of_newly_confirmed_cases_reported_in_the_past_14_days),
              borderColor: 'rgb(0, 0, 0)',
              backgroundColor: 'rgba(0, 0, 0)',
            }
          ],
        };
        
        return (
            this.state.loading ? 
            <CircularProgress style={progressStyle}/> 
            : 
            <Grid container>
              <Grid item xs={4}>
                <Paper className='paper'>
                  <Typography variant="body1" style={{padding:"10px", fontWeight: "bold"}}>
                      {"Confirmed Case in Past 14 Days"}
                  </Typography>
                  <Typography variant="body2" style={{padding:"10px"}}>
                      {this.numberWithCommas(this.state.confirm14)}
                      <i className="arrow up"></i>
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className='paper'>
                  <Typography variant="body1" style={{padding:"10px", fontWeight: "bold"}}>
                      {"Death Case in Past 14 Days"}
                  </Typography>
                  <Typography variant="body2" style={{padding:"10px"}}>
                    {this.numberWithCommas(this.state.death14)}
                    <i className="arrow up"></i>
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className='paper'>
                  <Typography variant="body1" style={{padding:"10px", fontWeight: "bold"}}>
                      {"Cumulative Number of Confirmed Cases"}
                  </Typography>
                  <Typography variant="body2" style={{padding:"10px"}}>
                      {this.numberWithCommas(this.state.cumulativeConfirm)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className='paper'>
                  <Line options={lineOptionPrediction} data={lineDataPrediction} />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className='paper'>
                  <Line options={lineOptionVaccination} data={lineDataVaccination} />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className='paper'>
                  <Line options={lineOptionCase} data={lineDataCase} />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className='paper'>
                  <Line options={lineOptionRt} data={lineDataRt} />
                </Paper>
              </Grid>
            </Grid>
        );
    }
};

export default DemoPage;