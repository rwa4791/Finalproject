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

export function addItem(item) {
  return { type: 'ADD_ITEM', payload: item }
}

export function itemHandler(value,field) {
  return {
    type: 'UPDATE_ITEM',
    payload: {
      value,
      field
    }
  }
}
