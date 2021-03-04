import { combineReducers } from 'redux';
import loginUserReducer from './login';
import walletReducer from './wallet';

const reducers = combineReducers({ loginUserReducer, walletReducer });

export default reducers;
