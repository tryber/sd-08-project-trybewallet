import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import apiRequest from './apiRequest';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducers = combineReducers({ user, wallet, apiRequest });

export default rootReducers;
