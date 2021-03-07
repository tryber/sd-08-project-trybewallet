import { ENTER_LOGIN } from '../actions';

const INITIAL_STATE = {
  user: [],
  email: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ENTER_LOGIN:
    return {
      ...state,
      email: action.value.email,
      user: action.value.user,
    };
  default: return state;
  }
};

export default reducer;
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
