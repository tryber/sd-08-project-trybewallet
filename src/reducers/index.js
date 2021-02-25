// import user from './user';
// import wallet from './wallet';
const initialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case 'something':
    return 'something';
  default:
    return state;
  }
}
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
