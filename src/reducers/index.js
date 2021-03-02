import { combineReducers } from 'redux';

import user from './user';
import wallet from './wallet';
import expense from './expense';
import reset from './reset';

export default combineReducers({
  user,
  wallet,
  expense,
  reset,
});
