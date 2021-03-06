//Import packages
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SellForm from '../components/SellForm.jsx';
import Card from 'material-ui/Card';
import blue900 from 'material-ui/styles/colors';
import Auth from '../modules/Auth';

const divStyle={
  backgroundColor: blue900
}

export default class SellitemModal extends React.Component {

  //Class constructor
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit(this.props.item);
    this.props.handleModal(event);
  }
  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
      />,
    ];

    return(
      <div>
          <Dialog
            actions={actions}
            open={this.props.open}
          >
          <SellForm
            onChange={this.props.onChange}
            errors={this.props.errors}
            item={this.props.item}
          />
          </Dialog>
      </div>

    )
  }
}
