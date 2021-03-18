import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import user from '../reducers/user';
import wallet from '../reducers/wallet';

const rootReducer = combineReducers({
  user,
  wallet,
});

const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk)));

export default store;
