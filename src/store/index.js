import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reduce from '../reducers';

const store = createStore(
  reduce,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
