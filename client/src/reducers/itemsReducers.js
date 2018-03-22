//Export items Reducers
export default function reducer( state = {
  fetching: false,
  creatingItem: false,
  sellingItem: false,
  updatingItem: false,
  deletingItem: false,
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
    case 'UPDATING_ITEM_START' : {
      return{
        ...state,
        updatingItem: true
      }
    }
    case 'UPDATING_ITEM_ERROR' : {
      return{
        ...state,
        errors: action.payload,
        updatingItem: false,
      }
    }
    case 'UPDATING_ITEM_FULFILLED' : {
      return{
        ...state,
        updatingItem: false,
      }
    }
    case 'DELETING_ITEM_START' : {
      return{
        ...state,
        deletingItem: true
      }
    }
    case 'DELETING_ITEM_ERROR' : {
      return{
        ...state,
        errors: action.payload,
        deletingItem: false,
      }
    }
    case 'DELETING_ITEM_FULFILLED' : {
      return{
        ...state,
        deletingItem: false,
      }
    }
    default: {
      return state;
    }
  }
}
