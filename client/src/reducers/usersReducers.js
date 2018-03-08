export default function reducer ( state ={
  fetching: true,
  fetched: false,
  user: {},
  _id: null,
  errors: {}
}, action ) {

  switch(action.type){
    case 'UPDATE_ID' : {
      return {...state, _id: action.payload}
    }
    case 'UPDATE_USER' : {
      return {...state, user: action.payload}
    }
    case 'USER_ERROR' : {
      return {...state, errors: action.payload }
    }
    case 'FETCH_USER_START' :{
      return{
        ...state,
        fetching: true,
      }
    }
    case 'FETCH_USER_ERROR' : {
      return {
        ...state,
        errors: action.payload,
        fetching: false
      }
    }
    case 'FETCH_USER_FULFILLED' : {
      return {
        ...state,
        user: action.payload,
        fetching: false,
        fetched: true
     }
    }
    default: {
      return state;
    }
  }
}
