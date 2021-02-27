
import { combineReducers } from 'redux';
import userReducer from './user';
// import wallet from './wallet';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
