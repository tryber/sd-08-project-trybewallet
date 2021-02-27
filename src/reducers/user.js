// Esse reducer será responsável por tratar as informações da pessoa usuária
const InitialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};
const userReducer = (state = InitialState, action) => {
  switch (action.type) {
  case 'USR_ADD':
    return {
      ...state,
      email: action.email,
    };

    // change code above this line
  default:
    return state;
  }
};
export default userReducer;
