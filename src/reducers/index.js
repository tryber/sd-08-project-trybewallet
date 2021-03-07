import { combineReducers } from 'redux';

import user from './user';
import wallet from './wallet';

export default combineReducers({
  user,
  wallet,
});
