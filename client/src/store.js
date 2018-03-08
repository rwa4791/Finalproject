//  Import redux
import { applyMiddleware, createStore} from 'redux';

//  Import middleware
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

//  Import reducers
import reducer from './reducers';

const logger = createLogger({
  collapsed: true,
});

//Create middleware
const middleware = applyMiddleware(promise(), logger, thunk);

//Export
export default createStore(reducer, middleware);
