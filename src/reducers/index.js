import { combineReducers } from 'redux';
import user from './user';
// import Api from './Api';
import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({ user, wallet });

export default rootReducer;
