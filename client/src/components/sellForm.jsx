import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import Auth from '../modules/Auth';

const formStyle ={
  margin: "auto"
}

export default class SellForm extends React.Component {

  constructor(props){
    super(props);

  }
  //Add a new Item function
  sellItem(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    // create a string for an HTTP body message
    const id = encodeURIComponent(this.props.item._id);
    const quantity = encodeURIComponent(1);
    const price = encodeURIComponent(this.props.item.price);
    const soldItem = `quantity=${quantity}&price=${price}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/api/item/${this.props.item._id}`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      //If successfully created a item
      if (xhr.status === 200) {
        console.log('YYYAAAYYYY!!!!!!!!!!!!');
        this.props.handleItemArray(xhr.response)
      }else{
        console.log('ERROR!!!!!!!!!!!');
      }
    });
    xhr.send(soldItem);
  }

  render(){
    console.log(this.props)
    return(
      <Card className={'container'}>
        <form style={formStyle}>
          <h2 className="card-heading">Sell Item</h2>


          <div className="field-line">
            <p><b>Item:</b> {this.props.item.name} <b>Quantity: </b> {this.props.item.quantity}</p>
          </div>

        </form>
      </Card>
    )
  }
}
