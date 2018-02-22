import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import HomePage from './containers/HomePage.jsx';
import PageNotfound from './containers/PageNotfound.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LogoutPage from './containers/LogoutPage.jsx';
import AboutPage from './containers/AboutPage.jsx';
import Price from './containers/price.jsx';
import Navbar from './components/Navbar.jsx'
import Theme from './components/Theme.jsx'

const backgroundImg = 'https://i.ytimg.com/vi/fZF3xDld69s/maxresdefault.jpg';

const divStyle ={
  height: "100vh",
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: 'cover',
  overflow: 'hidden',
};

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDom.render((
  <div style={divStyle}>
    <Router>
      <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route exact path="/signup" component={SignUpPage}/>
            <Route exact path="/dashboard" component={DashboardPage}/>
            <Route exact path="/logout" component={LogoutPage}/>
            <Route exact path="/about" component={AboutPage}/>
            <Route exact path="/price" component={Price}/>
            <Route component={PageNotfound}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    </Router>
  </div>
), document.getElementById('react-app'));
