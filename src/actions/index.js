function login(email) {
  return ({
    type: 'LOGIN',
    email,
  });
}

function saveCurrencies(currencies) {
  return ({
    type: 'SAVE_CURRENCIES',
    currencies,
  });
}

export function fetchCurrencies() {
  return async (dispatch) => {
    const respAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const respJson = await respAPI.json();
    return dispatch(saveCurrencies(respJson));
  };
}

export default login;
