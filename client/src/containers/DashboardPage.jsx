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

//Styles
const buttonStyle = {
  margin: 5,
};

// Comtainer
class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props,context) {
    super(props, context);

    this.state = {
      _id: localStorage.getItem('_id'),
      itemArray: [],
      itemsChecked: [],
      secretData: '',
      errors: {},
      openAddItem: false,
      openSellItem: false,
      item: {
        name: '',
        description: '',
        quantity: '',
        price: '',
      },
    };
    //Bind function to this component
    this.processForm = this.processForm.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.addHandleModal = this.addHandleModal.bind(this);
    this.sellHandleModal = this.sellHandleModal.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);

  }
  //Add a new Item function
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

  //Add checked item to itemsChecked
  handleRowSelection( selectedRows ){
    //Empety itemsChecked Array
    this.setState({
      itemsChecked: []
    })

    if(selectedRows === 'all'){
      console.log('HELLO');
    }else{
      //Add Item to itemsChecked
      selectedRows.map((row) => {
        this.setState(previousState => ({
          itemsChecked: [...previousState.itemsChecked, previousState.itemArray[row]]
        }))
      })
    }

  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const userData = `user_id=${this.state._id}`;
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/item/user/${this.state._id}`);
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
  addHandleOpen() {
    this.setState({openAddItem: true});
  };

  addHandleClose() {
    this.setState({openAddItem: false});
  };
  addHandleModal(event){
    event.preventDefault();
    if(this.state.openAddItem ) {
      this.addHandleClose();
    }else {
      this.addHandleOpen();
    }
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
          <ChartsCard itemArray={this.state.itemArray}/>
        </Card>
        <Card className='container'>
          <ItemTable
            itemArray={this.state.itemArray}
            handleRowSelection={this.handleRowSelection}
          />
          <RaisedButton style={buttonStyle} onClick={this.addHandleModal} label="Add"  primary />
          <RaisedButton style={buttonStyle} onClick={this.sellHandleModal} label="Sell"  primary />

          <AddItemModal
            handleModal={this.addHandleModal}
            open={this.state.openAddItem}
            onSubmit={this.processForm}
            onChange={this.changeItem}
            errors={this.state.errors}
            item={this.state.item}
          />
          <SellItemModal
            itemArray={this.state.itemsChecked}
            handleModal={this.sellHandleModal}
            open={this.state.openSellItem}
            onChange={this.changeItem}
            errors={this.state.errors}
          />
        </Card>
      </div>
    )
  }

}

export default DashboardPage;
