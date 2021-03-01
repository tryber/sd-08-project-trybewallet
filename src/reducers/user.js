// Esse reducer será responsável por tratar as informações da pessoa usuária
const InitialState = {
  email: '',
};
const userReducer = (state = InitialState, action) => {
  switch (action.type) {
  case 'USR_ADD':
    return {
      ...state,
      user: {
        email: action.email,
      },
    };

    // change code above this line
  default:
    return state;
  }
};
export default userReducer;
