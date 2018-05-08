//  Import libraries
import axios from 'axios';
import Auth from '../modules/Auth';
import { push } from 'react-router-redux';

//  Export functions
export function fetchUser(formData){

  return function(dispatch) {
    //Start fetch
    dispatch({type: 'FETCH_USER_START'})
    //Post request for login user
    axios.post(`/auth/login`, formData)
      .then((res) => {
        //authenticated
        Auth.authenticateUser(res.data.token);
        dispatch({type: 'UPDATE_AUTHENTICATED'})
        //Save _id
        localStorage.setItem('_id', res.data.user.id);
        //save user data
        dispatch({type: 'FETCH_USER_FULFILLED', payload: res.data.user})
      })
      //Catch error
      .catch((err) =>{
        console.log(err)
        dispatch({type: 'FETCH_USER_ERROR', payload: err })
      })
  }
}
export function changeLogin(event, login){
  return function(dispatch) {
    const field = event.target.name;
    login[field] = event.target.value;
    dispatch({type: 'UPDATE_LOGIN', payload: login})
  }
}
