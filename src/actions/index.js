export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCESS = 'REQUEST_API_SUCESS';
const url = 'https://economia.awesomeapi.com.br/json/all';

const requestApi = () => (
  {
    type: REQUEST_API,
    isLoading: true,
  }
);

const requestApiSucess = (payload) => (
  {
    type: REQUEST_API_SUCESS,
    isLoading: false,
    payload: [...payload],
  }
);

export const fetchApi = () => fetch(url)
  .then((data) => data.json())
  .then((values) => Object.values(values))
  .then((response) => response.filter((element) => element.codein !== 'BRLT'));

export const fetchApiWallet = () => fetch(url)
  .then((data) => data.json());
export function fetchApiThunk() {
  return async (dispatch) => {
    dispatch(requestApi());
    const data = await fetchApi();
    return dispatch(requestApiSucess(data));
  };
}
export const USER_LOGIN = 'USER_LOGIN';
export const USER_WALLET = 'USER_WALLET';
export function userLogin(email) {
  return (
    { type: USER_LOGIN,
      payload: email,
    }
  );
}

function userWalletAll(payload, exchangeRates) {
  return (
    { type: USER_WALLET,
      payload: { ...payload, exchangeRates },
    }
  );
}

export function userWallet(payload) {
  return (dispatch) => fetchApiWallet()
    .then((data) => dispatch(userWalletAll(payload, data)));
}
