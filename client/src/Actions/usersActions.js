//  Import libraries
import axios from 'axios';

//  Export functions
export function fetchUser(e,p){

  const email = encodeURIComponent(e);
  const password = encodeURIComponent(p);
  const formData = `email=${email}&password=${password}`;

  return function(dispatch) {
    dispatch({type: 'FETCH_USER_START'})

    var authOptions = {
      method: 'POST',
      url: `/auth/login${formData}`,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    };

    axios(authOptions)
      .then((res) => {
        dispatch({type: 'FETCH_USER_FULFILLED', payload: res.data})
      })
      .catch((err) =>{
        dispatch({type: 'FETCH_USER_ERROR', payload: err })
      })
  }
}
export function changeUser(event, user){
  const field = event.target.name;
  user[field] = event.target.value;
  dispatch({type: 'UPDATE_USER'}, user)
}
