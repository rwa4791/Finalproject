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
    console.log(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleItemArray = this.handleItemArray.bind(this);
  }
  handleItemArray(newItem){
    let tempArray = this.props.itemArray;
    for(let i = 0; i < tempArray.length; i++){
      if(i === this.props.row){
        tempArray[i] = newItem;
      }
      console.log(tempArray[i]);
    }

    console.log(tempArray);
    this.props.updateItemArray(tempArray);
  }
  handleSubmit(event){
    event.preventDefault();
    this.refs.itemSold.sellItem(event);
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
            ref='itemSold'
            onChange={this.props.onChange}
            errors={this.props.errors}
            item={this.props.itemArray[this.props.row]}
            handleItemArray={this.handleItemArray}
          />
          </Dialog>
      </div>

    )
  }
}
