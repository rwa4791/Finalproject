import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';
import { connect } from 'react-redux';
import { fetchUser, changeLogin } from '../actions/usersActions'
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { push } from 'react-router-redux';

@connect((store)=>{
  return{
    auth: store.settings.authenticated,
    successMessage: store.settings.successMessage,
    _id: store.users._id,
    errors: store.users.errors,
    user: store.users.user,
    login: store.users.login,
    location: store.router.location.pathname,
  }
})
export default class LoginPage extends React.Component {


  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeLogin.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    // formData to send
    const email = encodeURIComponent(this.props.login.email);
    const password = encodeURIComponent(this.props.login.password);
    const formData = `email=${email}&password=${password}`;

    //Clear LoginForm
    this.props.dispatch({
      type:"UPDATE_LOGIN",
      payload: {}
    })

    //Get user data
    Promise.resolve(this.props.dispatch(fetchUser(formData)))
      .then( () =>{
        //forward to dashboard
        this.props.dispatch(push('/dashboard'))
      })
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeLogin(event) {
    event.preventDefault();
    this.props.dispatch(changeLogin(event, this.props.login))
  }
  componentDidMount() {
    if(Auth.getToken()!== null){
      this.props.dispatch(push('/'))
    }
  }
  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.props.errors}
          successMessage={this.props.successMessage}
          login={this.props.login}
        />
      </div>
    );
  }

}
