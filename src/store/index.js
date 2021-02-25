import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import reducer from '../reducers';

const store = createStore(
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
// adicionar reducer como 1º param na função
export default store;
