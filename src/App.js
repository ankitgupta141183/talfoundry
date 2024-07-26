import React from 'react';
import Routes from "./Routes";
import {  Route } from "react-router-dom"
import { connect } from "react-redux";
import './index.css';
import './main.css';
import './static/stylesheets/admin.css';
import './static/stylesheets/home.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends React.Component {
  render() {
    return <Route component={Routes} />;
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, null)(App)
