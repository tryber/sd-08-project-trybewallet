// Coloque aqui suas actions
export const ADCIONAR_EMAIL = 'ADCIONAR_EMAIL';
export const FET_API = 'FET_API';
export const EXPENSE = 'EXPENSE';
export const REMOVE = 'REMOVE';

export const adcionarEmail = (value) => ({
  type: ADCIONAR_EMAIL,
  value,
});

function getApi(json) {
  return { type: FET_API, payload: json };
}

export const despesaAtual = (value) => ({
  type: EXPENSE,
  value,
});

export const removeExpense = (id) => ({
  type: REMOVE,
  payload: id,
});

export function fetApi() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((r) => r.json())
      .then((data) => {
        delete data.USDT;
        dispatch(getApi(data));
      });
  };
}
