import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './components/Navbar.jsx';
import Theme from './components/Theme.jsx';
import PageRouter from './containers/PageRouter.jsx';

const backgroundImg = './img/background.jpg';

const divStyle ={
  height: "100vh",
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: 'cover',
  overflow: 'hidden',
};

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

export default class App extends Component {

  render() {

    return(
      <div style={divStyle}>
        <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
          <div>
            <Navbar />
            <PageRouter />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
