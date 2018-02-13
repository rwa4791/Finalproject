//Import packages
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ItemForm from '../components/ItemForm.jsx';
import Card from 'material-ui/Card';
import blue900 from 'material-ui/styles/colors';

const divStyle={
  backgroundColor: blue900
}

export default class ItemModal extends React.Component {

  //Class constructor
  constructor(props){
    super(props);
    this.state = {
      open: false,
    };

    this.handleModal = this.handleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };
  handleModal(event){
    event.preventDefault();
    if(this.state.open ) {
      this.handleClose();
    }else {
      this.handleOpen();
    }
  }
  handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit(event);
    this.handleClose();
  }
  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
      />,
    ];
    return(
      <div>
        <RaisedButton label="Add" onClick={this.handleModal} primary />
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
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
