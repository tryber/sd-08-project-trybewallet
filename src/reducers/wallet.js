// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case '':
    return payload;

  case '1':
    return payload;

  case '2':
    return payload;

  case '3':
    return payload;

  default:
    return state;
  }
}
