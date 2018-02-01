import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import { browserHistory, Router } from 'react-router';
import routes from './routes.js';
import {AppBar, FlatButton, IconButton} from 'material-ui';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import HomePage from './containers/HomePage.jsx';

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
          title={<span style={styles.title}>inventory Assistant</span>}
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
        <div>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/signup" component={SignUpPage}/>
        </div>
      </div>
    </MuiThemeProvider>
  </Router>

), document.getElementById('react-app'));
