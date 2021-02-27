import { createReducer } from 'reduxsauce';
import { Types } from '../actions/user';

const INITIAL_STATE = {
  email: '',
};

const saveEmail = (state = INITIAL_STATE, action) => ({ ...state, email: action.email });

const HANDLERS = {
  [Types.SAVE_EMAIL]: saveEmail,
};

export default createReducer(INITIAL_STATE, HANDLERS);
