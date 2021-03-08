import { combineReducers } from 'redux';
import user from './user';
import currency from './wallet';

const rootReducer = combineReducers({
  user,
  currency,
});

export default rootReducer;
