import React  from 'react';
import {BrowserRouter as Router, Route, Switch, IndexRoute, Link} from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import LogoutPage from './LogoutPage.jsx';
import AboutPage from './AboutPage.jsx';
import Price from './price.jsx';
import DashboardPage from './DashboardPage.jsx';
import PageNotfound from './PageNotfound.jsx';
import { connect } from 'react-redux';

@connect((store)=>{
  return{
    auth: store.settings.authenticated,
  }
})
export default class Navbar extends React.Component{

  render(){
    return(
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage}/>
          <Route exact path="/dashboard" component={DashboardPage}/>
          <Route exact path="/logout" component={LogoutPage}/>
          <Route exact path="/about" component={AboutPage}/>
          <Route exact path="/price" component={Price}/>
          <Route component={PageNotfound}/>
        </Switch>
    )
  }
}
