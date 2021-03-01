// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: 'test@test.com',
};
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EMAIL':
    console.log('reducer');
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default user;
