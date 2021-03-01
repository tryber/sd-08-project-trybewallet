// Esse reducer será responsável por tratar as informações da pessoa usuária
const InitialState = {
  email: '',
};
const userReducer = (state = InitialState, action) => {
  switch (action.type) {
  case 'USR_LOGIN':
    return {
      ...state,
      email: action.payload,
    };

  default:
    return state;
  }
};
export default userReducer;
