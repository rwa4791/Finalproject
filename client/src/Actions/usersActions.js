//  Import libraries
import axios from 'axios';

//  Export functions
export function fetchItems(){
  return function(dispatch) {
    axios.get('')
      .then((res) => {
        dispatch({type: 'UPDATE_USER', payload: res.data})
        dispatch({type: 'UPDATE_ID', payload: res.data._id})
      })
      .catch((err) =>{
        dispatch({type: 'USER_ERROR', payload: err })
      })
  }
}
