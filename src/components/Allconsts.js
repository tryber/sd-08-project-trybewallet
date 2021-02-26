const MIN_PASSWORD_LENGHT = 6;
const USER_EMAIL = 'USER_EMAIL';
const REGEX_VERIFY_EMAIL = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

export { INITIAL_STATE, MIN_PASSWORD_LENGHT, USER_EMAIL, REGEX_VERIFY_EMAIL };
