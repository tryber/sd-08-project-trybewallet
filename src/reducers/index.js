import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const combined = combineReducers({ user, wallet });

export default combined;
