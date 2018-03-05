//Import combineReducers
import { combineReducers } from 'redux';

//Import reducers to be exporter
import users from './usersReducers';
import items from './itemsReducers';
import settings from './settingsReducers';

export default combineReducers({
  users,
  items,
  settings
})
