// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL = {
  email: 'alguem@email.com',
};

const reducer = (state = INITIAL, action) => {
  switch (action.type) {
  case '':
    return state;
  default:
    return state;
  }
};

export default reducer;
