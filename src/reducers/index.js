// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import wallet2 from './wallet2';

const rootReducer = combineReducers({
  user,
  wallet,
  wallet2,
});

export default rootReducer;
