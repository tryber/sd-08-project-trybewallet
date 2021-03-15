import  { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const rootReducer = combineReducers({ user, wallet });

export default rootReducer;


// import { ENTER_LOGIN } from '../actions';

// const INITIAL_STATE = {
//   email: '',
// };

// const user = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//   case ENTER_LOGIN:
//     return {
//       email: action.value.email,
//     };
//   default: return state;
//   }
// };

// export default user;
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
