//Export items Reducers
export default function reducer( state = {
  fetching: false,
  fetched: false,
  itemArray: [],
  row: '',
  errors: {},
  item: {
    name: '',
    description: '',
    quantity: '',
    price: '',
  }
}, action ) {

  // Switch statement
  switch(action.type){

    //Update Items array
    case 'UPDATE_ITEM' : {
      return{ ...state, item: action.payload}
    }
    case 'FETCH_ITEMS_FULFILLED' : {
      return {
        ...state,
        itemArray: action.payload,
        fetching: false,
        fetched: true
     }
    }
    case 'FETCH_ITEMS_ERROR' : {
      return {
        ...state,
        errors: action.payload,
        fetching: false
      }
    }
    case 'ADD_ITEM' : {
      return {
        ...state,
        itemArray: items.concat(action.payload)
      }
    }
    case 'FETCH_ITEMS_START' :{
      return{
        ...state,
        fetching: true,
      }
    }
    default: {
      return state;
    }
  }
}
