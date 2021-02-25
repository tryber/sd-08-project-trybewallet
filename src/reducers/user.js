const INITIAL_STATE = {
  email: 'alguem@email.com',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CHANGE_EMAIL':
    return { ...state, email: action.email };
  default:
    return state;
  }
}
