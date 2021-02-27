import { combineReducers } from 'redux';
import userReducer from './user';
import { outwalletReducer, inwalletReducer } from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({
  user: userReducer,
  wallet: { outwalletReducer, inwalletReducer },
});

export default rootReducer;
