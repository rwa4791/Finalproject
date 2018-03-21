//Import packages
import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import ItemForm from '../components/ItemForm.jsx';
import ItemTable from './ItemTable.jsx';
import AddItemModal from '../components/AddItemModal.jsx';
import SellItemModal from '../components/SellItemModal.jsx';
import Card from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ChartsCard from './ChartsCard.jsx';
import { connect } from 'react-redux';
import { fetchItems, createItem, changeItem, sellItem } from '../actions/itemsActions';
import axios from 'axios';
import { push } from 'react-router-redux'

//Styles
const buttonStyle = {
  margin: 5,
};

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
  }
})
export default class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props,context) {
    super(props, context);

    //Bind function to this component
    this.processForm = this.processForm.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.addHandleModal = this.addHandleModal.bind(this);
    this.sellHandleModal = this.sellHandleModal.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.sellItem = this.sellItem.bind(this);

  }
  //Add a new Item function
  processForm(event) {
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
    //Clear LoginForm
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

  /**
   * Change the Item object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeItem(event) {
    event.preventDefault();
    this.props.dispatch(changeItem(event, this.props.item))
  }

  //Add checked item to itemsChecked
  handleRowSelection( selectedRows ){
    //Empety row
    this.props.dispatch({type: 'UPDATE_ROW', payload: ''})

    if(selectedRows === 'all'){
      console.log('WARRING! YOU selected all rows this function is not available');
    }else if (selectedRows.length === 0){
      //Add Item to itemsChecked
      this.props.dispatch({type: 'UPDATE_ROW', payload: ''})
    }else{
      this.props.dispatch({type: 'UPDATE_ROW', payload: selectedRows[0]})
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
  sellItem(item){
    // const id = encodeURIComponent(item._id);
    const id = item._id
    const quantity = encodeURIComponent(1);
    const price = encodeURIComponent(item.price);
    const soldItem = `quantity=${quantity}&price=${price}`;

    Promise.resolve(this.props.dispatch(sellItem(soldItem, id)))
      .then( () =>{
        //Then reload all items
        console.log('hello');
        this.props.dispatch(fetchItems(this.props._id));
      }).catch( (err) =>{
        //Warring any errors
        console.log('WARRING!!!', err);
      })

  }
  addHandleModal(event){
    event.preventDefault();
    this.props.dispatch({type: 'UPDATE_MODAL_ADDITEM'})
  }
  sellHandleModal(event) {
    event.preventDefault();
    this.props.dispatch({type: 'UPDATE_MODAL_SELLITEM'})
  };

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <Card className='container'>
          <h2 className="card-heading">Inventory</h2>
          <ChartsCard itemArray={this.props.itemArray}/>
        </Card>
        <Card className='container'>
          <ItemTable
            itemArray={this.props.itemArray}
            handleRowSelection={this.handleRowSelection}
          />
          <RaisedButton
            style={buttonStyle}
            onClick={this.addHandleModal}
            label="Add"
            primary />
          <RaisedButton
            style={buttonStyle}
            onClick={this.sellHandleModal} label="Sell"
            secondary
            disabled={this.props.row === ''}
            />

          <AddItemModal
            handleModal={this.addHandleModal}
            open={this.props.openAddItem}
            onSubmit={this.processForm}
            onChange={this.changeItem}
            errors={this.props.errors}
          />
          <SellItemModal
            item={this.props.itemArray[this.props.row]}
            row={this.props.row}
            handleModal={this.sellHandleModal}
            open={this.props.openSellItem}
            errors={this.props.errors}
            onSubmit={this.sellItem}
          />
        </Card>
      </div>
    )
  }

}
