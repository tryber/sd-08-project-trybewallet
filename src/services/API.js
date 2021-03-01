const WALLET_API = 'https://economia.awesomeapi.com.br/json/all';

const getWalletAPI = () => (
  fetch(WALLET_API)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getWalletAPI;
