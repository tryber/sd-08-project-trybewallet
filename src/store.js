import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import saveUser from './reducers/user';
import wallet from './reducers/wallet';

const rootReducer = combineReducers({
  user: saveUser,
  wallet,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
