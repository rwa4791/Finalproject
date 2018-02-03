import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import ItemForm from '../components/ItemForm.jsx';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props,context) {
    super(props, context);

    this.state = {
      secretData: '',
      errors: {},
      item: {
        name: '',
        description: '',
        quantity: '',
        price: ''
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeItem = this.changeItem.bind(this);

  }
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.item.name);
    const description = encodeURIComponent(this.state.item.description);
    const quantity = encodeURIComponent(this.state.item.quantity);
    const price = encodeURIComponent(this.state.item.price);
    const itemData = `name=${name}&description=${description}&quantity=${quantity}&price=${price}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/item/');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // set a message
        localStorage.setItem('successMessage', xhr.response.message);

        // make a redirect
        //this.context.router.history.push('/dashboard');
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(itemData);
  }
  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeItem(event) {
    const field = event.target.name;
    const item = this.state.item;
    item[field] = event.target.value;

    this.setState({
      item
    });
  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.user
        });
      }
    });
    console.log('secretData', secretData);
    xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <Dashboard secretData={this.state.secretData} />
        <ItemForm
          onSubmit={this.processForm}
          onChange={this.changeItem}
          errors={this.state.errors}
          item={this.state.item}
        />
      </div>
)}

}

export default DashboardPage;
