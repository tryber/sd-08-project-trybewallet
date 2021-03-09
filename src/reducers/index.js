import { combineReducers } from 'redux';
import user from './user';
// import Api from './Api';
import wallet from './wallet';
import edit from './edit';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({ user, wallet, edit });

export default rootReducer;
