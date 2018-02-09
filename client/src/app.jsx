import React from 'react';
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
        <AppBar
          titleStyle={appBarTitleStyle}
          showMenuIconButton={false}
          title={<span style={styles.title}>Inventory Assistant</span>}
          iconElementRight={
            <div>
              <Link to="/">
                <FlatButton label="HOME"/>
              </Link>
              <Link to="/signup">
                <FlatButton label="SIGN UP"/>
              </Link>
            </div>
          }>
        </AppBar>
        <Switch>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/signup" component={SignUpPage}/>
          <Route exact path="/dashboard" component={DashboardPage}/>
          <Route component={PageNotfound}/>
        </Switch>
      </div>
    </MuiThemeProvider>
  </Router>

), document.getElementById('react-app'));
