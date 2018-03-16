//Import packages
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ItemForm from '../components/ItemForm.jsx';
import Card from 'material-ui/Card';
import blue900 from 'material-ui/styles/colors';
import { connect } from 'react-redux';

//CSS
const divStyle={
  backgroundColor: blue900
}
@connect((store) => {
  return{
    item: store.items.item,
  }
})
export default class AddItemModal extends React.Component {

  //Class constructor
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit(event);
    this.props.handleModal(event)
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
            <ItemForm
              onChange={this.props.onChange}
              errors={this.props.errors}
              item={this.props.item}
              />
          </Dialog>
      </div>

    )
  }
}
