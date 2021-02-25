// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return action.value;
  default:
    return state;
  }
}

export default user;
