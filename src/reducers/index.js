import { combineReducers } from 'redux';

import user from './user';
import wallet from './wallet';
import logStatus from './logStatus';
import inputHandler from './inputHandler';

const appReducer = combineReducers({
  user,
  wallet,
  logStatus,
  inputHandler,
});

export default appReducer;

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
