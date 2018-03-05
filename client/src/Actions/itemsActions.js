//  Import libraries
import axios from 'axios';

//  Export functions
export function fetchItems(){
  return function(dispatch) {
    axios.get('')
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
