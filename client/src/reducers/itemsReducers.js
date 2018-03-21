//Export items Reducers
export default function reducer( state = {
  fetching: false,
  creatingItem: false,
  sellingItem: false,
  fetched: false,
  itemArray: [],
  errors: {},
  item: {
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
    case 'CREATING_ITEM_FULFILLED' : {
      return {
        ...state,
        creatingItem: false
      }
    }
    case 'CREATING_ITEM_START' : {
      return {
        ...state,
        creatingItem: true,
      }
    }
    case 'CREATING_ITEM_ERROR' : {
      return {
        ...state,
        errors: action.payload,
        creatingItem: false
      }
    }
    case 'FETCH_ITEMS_START' : {
      return{
        ...state,
        fetching: true,
      }
    }
    case 'SELLING_ITEM_START' : {
      return{
        ...state,
        sellingItem: true
      }
    }
    case 'SELLING_ITEM_ERROR' : {
      return{
        ...state,
        errors: action.payload,
        sellingItem: false,
      }
    }
    case 'SELLING_ITEM_FULFILLED' : {
      return{
        ...state,
        sellingItem: false,
      }
    }
    default: {
      return state;
    }
  }
}
