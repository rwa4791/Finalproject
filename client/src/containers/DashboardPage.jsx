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
import { fetchItems } from '../actions/itemsActions';
import axios from 'axios';

//Styles
const buttonStyle = {
  margin: 5,
};

@connect((store) => {
  return{
    _id: store.users._id,
    itemArray: store.items.itemArray,
    errors: store.items.errors,
    row: store.items.row,
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
    this.updateItemArray = this.updateItemArray.bind(this);

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

    //Clear form
    this.setState({
      item: {
        name: '',
        description: '',
        quantity: '',
        price: '',
      }
    })

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/item');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      //If successfully created a item
      if (xhr.status === 200) {
        let resItem = {
          name: xhr.response.name,
          description: xhr.response.description,
          quantity: xhr.response.quantity,
          price: xhr.response.price,
          sold: xhr.response.sold
        };
      //Push response to itemArray
        this.setState(previousState => ({
          itemArray: [...previousState.itemArray, resItem]
        }));
      }
    });
    xhr.send(itemData);
  }

  /**
   * Change the Item object.
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
  updateItemArray(itemArray) {
    console.log(itemArray)
    this.setState({
      itemArray: itemArray
    });
  }
  //Add checked item to itemsChecked
  handleRowSelection( selectedRows ){
    //Empety itemsChecked Array
    this.setState({
      row: ''
    })
    if(selectedRows === 'all'){
      console.log('HELLO');
    }else{
      //Add Item to itemsChecked
      this.setState(previousState => ({
        row: selectedRows[0]
      }))
    }

  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    //Get user Items
    if(this.props._id !== null){
      this.props.dispatch(fetchItems(this.props._id));
    }else if (localStorage.getItem('_id') && Auth.getToken()){
      this.props.dispatch({type: 'UPDATE_ID', payload: localStorage.getItem('_id')});

      Promise.resolve(this.props.dispatch({type: 'UPDATE_AUTHENTICATED'}))
        .then( () =>{
          this.props.dispatch(fetchItems(this.props._id));
        })
    }else{
      alert('Please log in!');
      window.location = '/';
    }
  };

  addHandleModal(event){
    event.preventDefault();
    this.props.dispatch({type: 'UPDATE_MODAL_ADDITEM'})
  }
  sellHandleOpen() {
    this.setState({openSellItem: true});
  };

  sellHandleClose() {
    this.setState({openSellItem: false});
  };
  sellHandleModal(event){
    event.preventDefault();
    if(this.state.openSellItem ) {
      this.sellHandleClose();
    }else {
      this.sellHandleOpen();
    }
  }
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
          <RaisedButton style={buttonStyle} onClick={this.addHandleModal} label="Add"  primary />
          <RaisedButton style={buttonStyle} onClick={this.sellHandleModal} label="Sell"  secondary />

          <AddItemModal
            handleModal={this.addHandleModal}
            open={this.props.openAddItem}
            onSubmit={this.processForm}
            onChange={this.changeItem}
            errors={this.props.errors}
            item={this.props.item}
          />
          <SellItemModal
            itemArray={this.props.itemArray}
            row={this.props.row}
            handleModal={this.sellHandleModal}
            open={this.props.openSellItem}
            onChange={this.changeItem}
            updateItemArray={this.updateItemArray}
            errors={this.props.errors}
          />
        </Card>
      </div>
    )
  }

}
