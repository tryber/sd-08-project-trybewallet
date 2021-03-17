import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const reducers = combineReducers({
  user,
  wallet,
});

export default reducers;
