export default function getEmail(email) {
  return {
    type: 'GET_LOGIN',
    payload: {
      email,
    },
  };
}

export const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

export const getCurrencies = (currency) => ({
  type: 'GET_CURRENCIES',
  currency: Object.keys(currency),
});

export const getAllData = (exchangeRates) => ({
  type: 'GET_ALL_DATA',
  exchangeRates,
});

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => {
        const result = json;
        delete result.USDT;
        dispatch(getCurrencies(result));
        dispatch(getAllData(result));
      });
  };
}

export function fetchCurrenciesNewValues(expense) {
  console.log(expense);
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => {
        const result = json;
        delete result.USDT;
        dispatch(getCurrencies(result));
        dispatch(getAllData(result));

        dispatch(addExpense(expense));
      });
  };
}
