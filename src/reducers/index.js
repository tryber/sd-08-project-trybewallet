// import user from './user';
// import wallet from './wallet';
import { combineReducers } from 'redux';
import userReducer from './user';
import walletRecuder from './wallet';
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({
  userReducer,
  walletRecuder,
});

export default rootReducer;
