import { combineReducers } from 'redux';
import userReducer from './user';
import { currenciesReducer } from './wallet';

const reducer = combineReducers({ user: userReducer, wallet: currenciesReducer });
export default reducer;
