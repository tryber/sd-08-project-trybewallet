import { combineReducers } from 'redux';
import login from './user';
import requestAPI from './wallet';

export default combineReducers({
  user: login,
  wallet: requestAPI,
});
