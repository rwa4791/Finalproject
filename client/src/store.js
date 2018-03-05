//  Import redux
import { applyMiddleware, createStore} from 'redux';

//  Import middleware
import {createLogger as logger} from 'redux-logger'
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

//  Import reducers
import reducer from './reducers';



//Create middleware
const middleware = applyMiddleware(promise(), logger(), thunk);

//Export
export default createStore(reducer, middleware);
