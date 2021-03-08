import { combineReducers } from 'redux';
import user from './user';
import Wallet from './wallet';

const reducers = combineReducers({
  user,
  Wallet,
});

export default reducers;
