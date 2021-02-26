// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
import { combineReducers } from 'redux';
import userReducer from './user';
import { currenciesReducer } from './wallet';

const reducer = combineReducers({ user: userReducer, wallet: currenciesReducer });
export default reducer;
