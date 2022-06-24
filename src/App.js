import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Material UI Imports
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";

// Component Imports
import AppBar from "./components/AppBar";

// Page Imports
import HomePage from "./components/pages/HomePage";
import NoPageFound from "./components/pages/NoPageFound";
import CaseDetailsPage from "./components/pages/CaseDetailsPage";
import RiskLevelPage from "./components/pages/RiskLevelPage";
import PHSMPage from "./components/pages/PHSMPage";
import SettingsPage from "./components/pages/SettingsPage";
import DemoPage from "./components/pages/DemoPage";

// Action Imports
import {setSettings} from "./actions/settings-actions";

// Local Storage Operations
import {getLocalSettings,setLocalSettings} from "./services/settingsOperations";

class App extends Component {

  constructor(props) {
    super(props);

    // Settings init
    let settings = getLocalSettings();
    if (settings===null || settings===undefined)
      setLocalSettings(this.props.settings);
    else
      this.props.setSettings(settings);

  }

  render() {

    const theme = createTheme(this.props.settings);

    return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline/>
          <Router>
            <AppBar/>
              <Switch>
                <Route path={"/"} exact /*strict*/ component={HomePage}/>
                <Route path={"/settings"} exact /*strict*/ component={SettingsPage}/>
                <Route path={"/case-details"} exact /*strict*/ component={CaseDetailsPage}/>
                <Route path={"/demo"} exact /*strict*/ component={DemoPage}/>
                <Route path={"/risk-level"} exact /*strict*/ component={RiskLevelPage}/>
                <Route path={"/phsm"} exact /*strict*/ component={PHSMPage}/>
                <Route exact /*strict*/ component={NoPageFound}/>
              </Switch>
          </Router>
        </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {...state,...props};
};

const mapDispatchToProps = {
  setSettings
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
