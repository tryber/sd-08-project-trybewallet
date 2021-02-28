import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer, walletReducer } from '../reducers';

const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
});

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
