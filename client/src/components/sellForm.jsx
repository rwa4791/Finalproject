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

  render(){

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
