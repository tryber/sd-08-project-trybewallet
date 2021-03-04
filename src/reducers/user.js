// Esse reducer será responsável por tratar as informações da pessoa usuária
// const InitialState = {
//   user: {
//     email: '',
//   },
//   wallet: {
//     currencies: [],
//     expenses: [],
//   },
// };

const InitialState = {
  email: '',
};
const user = (state = InitialState, action) => {
  switch (action.type) {
  case 'USER_EMAIL':
    return {
      ...state,
      email: action.payload.userEmail,
    };
  default:
    return state;
  }
};

export default user;
