import TYPES from './types';

const getCurrencies = (payload) => ({
  type: TYPES.GET_CURRENCIES,
  payload,
});

const reqCurrencies = () => ({
  type: TYPES.REQ_CURRENCIES,
});

export default function fetchCurrencies() {
  return (dispatch) => {
    dispatch(reqCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencie) => {
        delete currencie.USDT;
        return currencie;
      })
      .then((currencie) => dispatch(getCurrencies(currencie)));
  };
}
