import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar, FlatButton, IconButton} from 'material-ui';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import HomePage from './containers/HomePage.jsx';
import PageNotfound from './containers/PageNotfound.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import { IndexLink } from 'react-router';
import Auth from './modules/Auth';
import LogoutPage from './containers/LogoutPage.jsx';
import About from './containers/about.jsx';
import Price from './containers/price.jsx';

const appBarTitleStyle={
  textAlign: "center"
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};
// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDom.render((
  <Router>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <AppBar titleStyle={appBarTitleStyle} showMenuIconButton={false} title={<span style={styles.title}>Inventory Assistant</span>}>
          {Auth.isUserAuthenticated() ?
            (
              <div>

              <Redirect to="/dashboard" push />
              <div className="top-bar-right">
                <Link to="/logout">
                  <FlatButton label="LOG OUT"/>

                </Link>
              </div>
              </div>)
               :
            (
              <div className="top-bar-right">
              <Link to="/">
                <FlatButton label="LOGIN"/>
              </Link>
              <Link to="/signup">
                <FlatButton label="SIGN UP"/>
              </Link>
               <Link to="/about">
                <FlatButton label="About"/>
              </Link>
               <Link to="/Price">
                <FlatButton label="Subscription"/>
              </Link>
            </div>)}
        </AppBar>

        <Switch>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/signup" component={SignUpPage}/>
          <Route exact path="/dashboard" component={DashboardPage}/>
          <Route exact path="/logout" component={LogoutPage}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/price" component={Price}/>
          <Route component={PageNotfound}/>
        </Switch>
      </div>
    </MuiThemeProvider>
  </Router>
), document.getElementById('react-app'));
