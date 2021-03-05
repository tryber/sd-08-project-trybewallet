import { combineReducers } from 'redux';
import user from './User';
import wallet from './Wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const reducers = combineReducers({
  user, wallet });

export default reducers;
