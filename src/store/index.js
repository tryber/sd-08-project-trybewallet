import { createStore, applyMiddleware } from 'redux';
import { componentWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const store = createStore(
  reducer,
  componentWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
