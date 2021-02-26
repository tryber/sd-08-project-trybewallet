// Coloque aqui suas actions
export const LOGGIN = 'LOGGIN';
export const WALLET = 'WALLET';
export const ACTION_BEGIN = 'ACTION_BEGIN';
export const ACTION_SUCCESS = 'ACTION_SUCCESS';

export const logginAction = (email) => ({
  type: LOGGIN,
  email,
});

export const actionBegin = () => ({ type: ACTION_BEGIN, loading: true });

export const actionSuccess = (information) => ({
  type: ACTION_SUCCESS,
  loading: false,
  information,
});

export function thunkCambio(information) {
  const path = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => {
    dispatch(actionBegin());
    return fetch(path)
      .then((data) => data.json())
      .then((coinInfo) => {
        const { value, description, currency, method, tag } = information;
        delete coinInfo.USDT;
        const currencyCodeInfos = coinInfo[currency];
        const { ask } = currencyCodeInfos;
        const valueInCurrency = parseFloat(ask);
        const valueInReal = parseFloat(information.value)
          * valueInCurrency;
        const objReturn = {
          description,
          value,
          currency,
          method,
          tag,
          valueInReal,
          exchangeRates: coinInfo,
        };
        dispatch(actionSuccess(objReturn));
      });
  };
}
