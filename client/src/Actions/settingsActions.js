
//Export functions
export function updateRow(row){
  return { type: 'UPDATE_ROW', payload: row}
}

export function updateSecretData(data){
  return { type: 'UPDATE_SECRETDATA', payload: data}
}

export function updateModalAddItem(){
  return { type: 'UPDATE_MODAL_ADDITEM' }
}

export function updateModalSellItem(){
  return { type: 'UPDATE_MODAL_SELLITEM' }
}
