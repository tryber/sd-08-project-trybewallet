const addRegister = (value) => ({ type: 'ADD_REGISTER', value });
export const deleteRegister = (value) => ({ type: 'DELETE_REGISTER', value });
export const editRegister = (value) => ({ type: 'EDIT_REGISTER', data: value });
const getCurrencies = (value) => ({ type: 'GET_CURRENCIES', value });
export const login = (value) => ({ type: 'LOGIN', value });

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const currenciesResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currenciesJason = await currenciesResponse.json();

      return dispatch(getCurrencies(currenciesJason));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchToRegister(state) {
  return async (dispatch) => {
    try {
      const currenciesResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currenciesJason = await currenciesResponse.json();
      let stateSemTotal = { ...state };
      delete stateSemTotal.total;
      stateSemTotal = { ...stateSemTotal, exchangeRates: currenciesJason };

      return dispatch(addRegister(stateSemTotal));
    } catch (error) {
      console.log(error);
    }
  };
}
