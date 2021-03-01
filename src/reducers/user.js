// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  email: '',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, email: action.payload.email };
  default:
    return state;
  }
}
