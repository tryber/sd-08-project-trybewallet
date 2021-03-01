import getCurrencies from '../services/getCurrencies';

// Coloque aqui suas actions
export const userEmailAction = (value) => ({
  type: 'LOGIN_EMAIL',
  value,
});

export const userPasswordAction = (value) => ({
  type: 'LOGIN_PASSWORD',
  value,
});

export const userCurrenciesAction = () => ({
  type: 'USER_CURRENCIES',
});

export const requestCurrencies = ({ moedas }) => ({
  type: 'REQUEST_CURRENCIES_SUCCESS',
  value: moedas,
});

export const walletThunk = () => (dispatch) => {
  dispatch(userCurrenciesAction());
  getCurrencies()
    .then((response) => dispatch(requestCurrencies(response)));
};
