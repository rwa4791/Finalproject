//Export items Reducers
export default function reducer( state = {
  items: [],
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
      return { ...state, items: action.payload }
    }
    case 'FETCH_ITEMS_ERROR' : {
      return { ...state, errors: action.payload }
    }
    case 'ADD_ITEM' : {
      return {
        ...state,
        items: items.concat(action.payload)
      }
    }
    default: {
      return state;
    }
  }
}
