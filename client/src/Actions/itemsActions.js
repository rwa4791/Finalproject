//  Import libraries
import axios from 'axios';
import Auth from '../modules/Auth';
//  Export functions
export function fetchItems(id){
  return function(dispatch) {
    dispatch({type: 'FETCH_ITEMS_START'})

    var authOptions = {
      method: 'GET',
      url: `/api/item/user/${id}`,
      headers: {
          'Authorization': `bearer ${Auth.getToken()}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    };

    axios(authOptions)
      .then((res) => {
        dispatch({type: 'FETCH_ITEMS_FULFILLED', payload: res.data})
      })
      .catch((err) =>{
        dispatch({type: 'FETCH_ITEMS_ERROR', payload: err })
      })
  }
}
export function createItem( itemData ){
  return function( dispatch ) {
    dispatch({type: 'CREATING_ITEM_START'})

    var authOptions = {
      method: 'POST',
      url: '/api/item',
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true,
      data: itemData
    };

    axios(authOptions)
      .then( (res) => {
        dispatch({type: 'CREATING_ITEM', payload: res.data})
      })
      .catch((err) => {
        dispatch({type: 'CREATING_ITEM_ERROR', payload: err})
      })
  }
}
export function addItem(item) {
  return { type: 'ADD_ITEM', payload: item }
}

export function changeItem(event, item) {
  return function(dispatch){
    console.log(item)
    const field = event.target.name;
    item[field] = event.target.value;
    dispatch({type: 'UPDATE_ITEM', payload: item})
  }
}
