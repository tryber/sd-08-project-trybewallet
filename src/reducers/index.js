import { combineReducers } from 'redux';
import userReducer from './user';
import walletReducer from './wallet';
import totalReducer from './total';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducers = combineReducers({
  user: userReducer,
  wallet: walletReducer,
  total: totalReducer,
});
export default rootReducers;
