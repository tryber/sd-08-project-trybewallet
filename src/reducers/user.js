const SAVE_EMAIL = 'SAVE_EMAIL';

function user(state = {}, action) {
  switch (action.type) {
  case SAVE_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default user;
