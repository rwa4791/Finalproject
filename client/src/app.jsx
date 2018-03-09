import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './components/Navbar.jsx';
import Theme from './components/Theme.jsx';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import PageRouter from './containers/PageRouter.jsx';
import { Provider } from 'react-redux';
import store from './store';
const backgroundImg = './img/background.jpg';

const divStyle ={
  height: "100vh",
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: 'cover',
  overflow: 'hidden',
};

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDom.render((
  <Provider store={store}>
      <Router>
        <div style={divStyle}>
        <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
          <div>
            <Navbar />
            <PageRouter />
          </div>
        </MuiThemeProvider>
      </div>
    </Router>
  </Provider>
), document.getElementById('react-app'));
