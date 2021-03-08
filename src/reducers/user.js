// Esse reducer será responsável por tratar as informações da pessoa usuária
const userReducer = (state = { email: '' }, action) => {
  switch (action.type) {
  case 'UPEMAIL':
    return { email: action.email };

  default:
    return state;
  }
};

export default userReducer;
