import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import ItemForm from '../components/ItemForm.jsx';
import ItemTable from './ItemTable.jsx';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props,context) {
    super(props, context);

    this.state = {
      itemArray: [],
      secretData: '',
      errors: {},
      _id: localStorage.getItem('_id'),
      item: {
        name: '',
        description: '',
        quantity: '',
        price: '',
      },
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
    const user_id = encodeURIComponent(this.state._id);
    const itemData = `name=${name}&description=${description}&quantity=${quantity}&price=${price}&user_id=${user_id}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/item');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {

    });
    xhr.send(itemData);
    //TODO: clear the form!
  }
  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  userHasInventory() {
    if (this.state.itemArray.length === 0 ) return false;
    else return true;
  }
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

    const user_id = encodeURIComponent(this.state._id);
    const userData = `user_id=${user_id}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/item/user/${user_id}`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      this.setState({
        itemArray: xhr.response
      });
    });
    xhr.send(userData);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <div>
          <ItemTable itemArray={this.state.itemArray}/>
        </div>
        <ItemForm
          onSubmit={this.processForm}
          onChange={this.changeItem}
          errors={this.state.errors}
          item={this.state.item}
        />
      </div>
    )
  }

}

export default DashboardPage;
