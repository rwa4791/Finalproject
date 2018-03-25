//  Import packages
import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

//  Import Component
import Dashboard from '../components/Dashboard.jsx';
import ItemForm from '../components/ItemForm.jsx';
import ItemTable from './ItemTable.jsx';
import AddItemModal from '../components/AddItemModal.jsx';
import SellItemModal from '../components/SellItemModal.jsx';
import Card from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ChartsCard from './ChartsCard.jsx';
import { red500 } from 'material-ui/styles/colors';
import DeleteItemModal from '../components/DeleteItemModal.jsx';
import UpdateItemModal from '../components/UpdateItemModal.jsx';

//  Import Actions
import { fetchItems,
         createItem,
         onChangeItem,
         sellItem,
         updateItem,
         deleteItem, } from '../actions/itemsActions';

//Styles
const buttonStyle = {
  margin: 5,
};
//Connect to redux store
@connect((store) => {
  return{
    _id: store.users._id,
    itemArray: store.items.itemArray,
    errors: store.items.errors,
    row: store.settings.row,
    item: store.items.item,
    secretData: store.settings.secretData,
    openAddItem: store.settings.openAddItem,
    openSellItem: store.settings.openSellItem,
    openUpdateItem: store.settings.openUpdateItem,
    openDeleteItem: store.settings.openDeleteItem,
  }
})
export default class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props,context) {
    super(props, context);

    //  Bind function to this component
    this.addItem = this.addItem.bind(this);
    this.sellItem = this.sellItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onChangeItem = this.onChangeItem.bind(this);
    //  Bind handle modal
    this.addHandleModal = this.addHandleModal.bind(this);
    this.sellHandleModal = this.sellHandleModal.bind(this);
    this.updateHandleModal = this.updateHandleModal.bind(this);
    this.deleteHandleModal = this.deleteHandleModal.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);

  }

  //Add a new Item function
  addItem(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    // create a string for an HTTP body message
    const name = encodeURIComponent(this.props.item.name);
    const description = encodeURIComponent(this.props.item.description);
    const quantity = encodeURIComponent(this.props.item.quantity);
    const price = encodeURIComponent(this.props.item.price);
    const user_id = encodeURIComponent(this.props._id);
    const itemData = `name=${name}&description=${description}&quantity=${quantity}&price=${price}&user_id=${user_id}`;

    //Clear Item
    this.props.dispatch({
      type:"UPDATE_ITEM",
      payload: {}
    })

    //Create new item
    Promise.resolve(this.props.dispatch(createItem(itemData)))
      .then( () =>{
        //Then reload all items
        this.props.dispatch(fetchItems(this.props._id));
      }).catch( (err) =>{
        //Warring any errors
        console.log('WARRING!!!', err);
      })
  }
  //  Sell Item function
  sellItem(item){

    const id = item._id
    const quantity = encodeURIComponent(1);
    const price = encodeURIComponent(item.price);
    const soldItem = `quantity=${quantity}&price=${price}`;

    Promise.resolve(this.props.dispatch(sellItem(soldItem, id)))
      .then( () =>{
        //Then reload all items
        this.props.dispatch(fetchItems(this.props._id));
      }).catch( (err) =>{
        //Warring any errors
        console.log('WARRING!!!', err);
      })

  }
  //  Update Item function
  updateItem(item){
    const id = item._id;
    const name = item.name;
    const quantity = item.quantity;
    const price = item.price;
    const description = item.description;

    const itemData = `name=${name}&quantity=${quantity}&price=${price}&description=${description}`;
    Promise.resolve(this.props.dispatch(updateItem(itemData, id)))
      .then( () =>{
        //Then reload all items
        this.props.dispatch(fetchItems(this.props._id));
      }).catch( (err) =>{
        //Warring any errors
        console.log('WARRING!!!', err);
      })
  }
  //  Delete Item function
  deleteItem(item){

    const id = item._id
    Promise.resolve(this.props.dispatch(deleteItem(id)))
      .then( () =>{
        //  Clear item
        this.props.dispatch({type: 'UPDATE_ITEM', payload: {}});
        //  Clear row
        this.props.dispatch({type: 'UPDATE_ROW', payload: ''});
        //  Then reload all items
        this.props.dispatch(fetchItems(this.props._id));
      }).catch( (err) =>{
        //Warring any errors
        console.log('WARRING!!!', err);
      })
  }
  // Item text handler
  onChangeItem(event) {
    event.preventDefault();
    this.props.dispatch(onChangeItem(event, this.props.item))
  }

  //  Select a row
  handleRowSelection( selectedRows ){
    //  Clear row
    this.props.dispatch({type: 'UPDATE_ROW', payload: ''})
    //  Clear item
    this.props.dispatch({
      type:"UPDATE_ITEM",
      payload: {}
    })

    if(selectedRows === 'all'){
      console.log('WARRING! YOU selected all rows this function is not available');
    }else if (selectedRows.length === 0){
      //Add Item to itemsChecked
      this.props.dispatch({type: 'UPDATE_ROW', payload: ''})
      //  Clear item
      this.props.dispatch({
        type:"UPDATE_ITEM",
        payload: {}
      })
    }else{
      let tempItem = (this.props.itemArray[selectedRows[0]])
      let item = {
        _id: tempItem._id,
        name: tempItem.name,
        quantity: tempItem.quantity,
        price: tempItem.price,
        soldItem: tempItem.soldItem,
        description: tempItem.description,
      }
      this.props.dispatch({type: 'UPDATE_ROW', payload: selectedRows[0]})
      this.props.dispatch({
        type:"UPDATE_ITEM",
        payload: item
      })
    }
  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    //Get user Items
    if(this.props._id !== ''){
      this.props.dispatch(fetchItems(this.props._id));
    }else if (localStorage.getItem('_id') && Auth.getToken()){
      this.props.dispatch({type: 'UPDATE_ID',  payload: localStorage.getItem('_id')});

      Promise.resolve(this.props.dispatch({type: 'UPDATE_AUTHENTICATED'}))
        .then( () =>{
          this.props.dispatch(fetchItems(this.props._id));
        })
    }else{
      alert('Please log in!');
      this.props.dispatch(push('/'));
    }
  };
  //  Handle sell button function
  sellButtonValidation(){
    //  Var
    let row = this.props.row
    let item = this.props.itemArray[row]
    //  No row selected
    if(row === '' || !item){
      //Disabled button
      return true
    //  Row is selected
    }else{
      //  && there is quantity available to sell
      if (item.quantity > 0){
        // Enabled sell button
        return false;
       }else {
         // Disable sell button
         return true;
       }
    }
  }
  //  Handle add Modal
  addHandleModal(event){
    event.preventDefault();
    this.props.dispatch({type: 'UPDATE_MODAL_ADDITEM'})
  }
  // Handle sell Modal
  sellHandleModal(event) {
    event.preventDefault();
    this.props.dispatch({type: 'UPDATE_MODAL_SELLITEM'})
  }
  //  Handle update Modal
  updateHandleModal(event){
    event.preventDefault();
    this.props.dispatch({type: 'UPDATE_MODAL_UPDATEITEM'})
  }
  //  Handle delete Modal
  deleteHandleModal(event){
    event.preventDefault();
    this.props.dispatch({type: 'UPDATE_MODAL_DELETEITEM'})
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <Card className='container'>
          <h2 className="card-heading">Inventory</h2>
          <ChartsCard itemArray={this.props.itemArray} />
        </Card>
        <Card className='container'>

          <ItemTable
            itemArray={this.props.itemArray}
            handleRowSelection={this.handleRowSelection} />

          <RaisedButton
            style={buttonStyle}
            labelStyle={{color: 'white'}}
            onClick={this.addHandleModal}
            label="Add"
            primary />
          <RaisedButton
            style={buttonStyle}
            labelStyle={{color: 'white'}}
            onClick={this.updateHandleModal}
            label="Update"
            primary
            disabled={this.props.row === ''} />
          <RaisedButton
            style={buttonStyle}
            labelStyle={{color: 'white'}}
            onClick={this.sellHandleModal}
            label="Sell"
            secondary
            disabled={this.sellButtonValidation()} />
          <RaisedButton
            style={buttonStyle}
            backgroundColor={red500}
            labelStyle={{color: 'white'}}
            onClick={this.deleteHandleModal}
            label="Delete"
            disabled={this.props.row === ''} />

          <AddItemModal
            handleModal={this.addHandleModal}
            open={this.props.openAddItem}
            onSubmit={this.addItem}
            onChange={this.onChangeItem}
            errors={this.props.errors} />
          <SellItemModal
            handleModal={this.sellHandleModal}
            open={this.props.openSellItem}
            onSubmit={this.sellItem}
            errors={this.props.errors} />
          <UpdateItemModal
            handleModal={this.updateHandleModal}
            open={this.props.openUpdateItem}
            onSubmit={this.updateItem}
            onChange={this.onChangeItem}
            errors={this.props.errors} />
          <DeleteItemModal
            item={this.props.item}
            row={this.props.row}
            handleModal={this.deleteHandleModal}
            open={this.props.openDeleteItem}
            onChange={this.onChangeItem}
            errors={this.props.errors}
            onSubmit={this.deleteItem} />

        </Card>
      </div>
    )
  }

}
