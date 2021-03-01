import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import edit from './edit';

const rootReducers = combineReducers({
  user,
  wallet,
  edit,
});

export default rootReducers;
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
