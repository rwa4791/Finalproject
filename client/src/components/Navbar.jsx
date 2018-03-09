import React, { PropTypes, Component } from 'react';
import {AppBar, FlatButton, IconButton} from 'material-ui';
import Auth from '../modules/Auth';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const appBarTitleStyle={
  textAlign: "left"
}
const styles = {
  title: {
    cursor: 'pointer',
  },
};
const flatButtonStyle = {
  margin: 10,
  color: 'white'
}

@connect((store)=>{
  return{
    auth: store.settings.authenticated
  }
})
export default class Navbar extends React.Component{
  render(){
    return(
      <AppBar titleStyle={appBarTitleStyle} showMenuIconButton={false} title={<span style={styles.title}>Inventory Assistant</span>}>
        {
          this.props.auth ?
          (
            <div>
              <Redirect to="/dashboard" push />

              <div className="top-bar-right">
                <FlatButton
                  label="SIGN OUT"
                  style={flatButtonStyle}
                  onClick={()=>{
                    this.props.dispatch({type: 'UPDATE_AUTHENTICATED'});
                    Auth.deauthenticateUser();
                    window.location = "/";
                  }}
                  />
              </div>
            </div>
          ):(
            <div className="top-bar-right">
              <div>
                <FlatButton
                  label="LOGIN"
                  style={flatButtonStyle}
                  containerElement={<Link to="/"/>}
                  />
                <FlatButton
                  label="SIGN UP"
                  style={flatButtonStyle}
                  containerElement={<Link to="/signup"/>}
                  />
              </div>
            </div>
          )
        }
        <FlatButton
          label="ABOUT"
          style={flatButtonStyle}
          containerElement={<Link to="/about"/>}
          />
        <FlatButton
          label="Subscription"
          style={flatButtonStyle}
          containerElement={<Link to="/price"/>}
          />
      </AppBar>
    )
  }
}
