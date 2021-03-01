import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleWare from 'redux-thunk';
import rootReducer from './reducers';

export default createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunkMiddleWare),
));
