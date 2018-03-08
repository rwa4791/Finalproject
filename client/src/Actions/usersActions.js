//  Import libraries
import axios from 'axios';
import Auth from '../modules/Auth';
//  Export functions
export function fetchUser(formData){

  return function(dispatch) {
    dispatch({type: 'FETCH_USER_START'})
    axios.post(`/auth/login`, formData)
      .then((res) => {
        console.log('HELLO:', res.data.user.id)
        Auth.authenticateUser(res.data.token);
        localStorage.setItem('_id', res.data.user.id);
        dispatch({type: "UPDATE_ID", payload: res.data.user.id})
        dispatch({type: 'UPDATE_AUTHENTICATED'});
        dispatch({type: 'FETCH_USER_FULFILLED', payload: res.data.user})
      })
      .catch((err) =>{
        console.log(err)
        dispatch({type: 'FETCH_USER_ERROR', payload: err })
      })
  }
}
export function changeUser(event, user){
  return function(dispatch) {
    const field = event.target.name;
    user[field] = event.target.value;
    dispatch({type: 'UPDATE_USER', payload: user})
  }
}
