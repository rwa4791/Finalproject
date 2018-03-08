import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';
import { connect } from 'react-redux';
import { fetchUser, changeUser } from '../actions/usersActions'

@connect((store)=>{
  return{
    auth: store.settings.authenticated,
    _id: store.users._id,
    errors: store.users.errors,
    user: store.users.user
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
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    this.props.dispatch(fetchUser(this.state.user.email, this.state.user.password));

  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    event.preventDefault();
    this.props.dispatch(changeUser(event, this.props.user))
  }
  componentDidMount() {
    if(Auth.getToken()!== null){
      this.props.dispatch({type: 'UPDATE_AUTHENTICATED'})
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
          user={this.props.user}
        />
      </div>
    );
  }

}
