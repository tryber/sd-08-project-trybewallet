// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function userReducer(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      user: {
        ...state.user,
        email: action.email,
      },
    };
  default:
    return {
      ...state,
    };
  }
}

export default userReducer;
