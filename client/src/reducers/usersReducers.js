export default function reducer ( state ={
  user: {},
  _id: '',
  errors: {}
}, action ) {

  switch(action.type){
    case 'UPDATE_ID' : {
      return {...state, user: action.payload}
    }
    case 'UPDATE_USER' : {
      return {...state, _id: action.payload}
    }
    case 'USER_ERROR' : {
      return {...state, errors: action.payload }
    }
    default:{
      return state;
    }
  }
}
