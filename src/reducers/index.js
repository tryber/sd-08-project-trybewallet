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

export default function wallet(state = initialState, action) {
  return state;
}
