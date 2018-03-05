export default function reducer ( state ={
  authenticated: false,
  row : '',
  secretData: '',
  errors: {},
  openAddItem: false,
  openSellItem: false
}, action ) {

  switch(action.type){
    case 'UPDATE_ROW' : {
      return {...state, row: action.payload}
    }
    case 'UPDATE_SECRETDATA' : {
      return {...state, secretData: action.payload}
    }
    case 'UPDATE_MODAL_ADDITEM' : {
      if( state.openAddItem === false){
        return {...state, openAddItem: true}
      }else {
        return {...state, openAddItem: false}
      }
    }
    case 'UPDATE_MODAL_SELLITEM' : {
      if( state.openAddItem === false){
        return {...state, openSellItem: true}
      }else {
        return {...state, openSellItem: false}
      }
    }
    case 'SETTING_ERRORS' : {
      return { ...state, errors: action.payload }
    }
    case 'UPDATE_AUTHENTICATED' : {
      if(state.authenticated === true){
        return {...state, authenticated: false}
      }else {
        return {...state, authenticated: true}
      }
    }
    default : {
      return state;
    }
  }
}
