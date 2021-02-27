import { combineReducers } from 'redux';
import user from './userSlice';
import wallet from './walletSlice';

const rootReducer = (combineReducers({ user, wallet }));

export default rootReducer;
