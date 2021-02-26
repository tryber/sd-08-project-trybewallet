import { SAVE_EMAIL } from './types';

export const saveEmail = (value) => ({
  type: SAVE_EMAIL,
  value,
});

// REQUISIÇÃO DO CAMBIO - ACTION ASSÍNCRONA
const getExpenses = (json) => ({
  type: 'GET_EXPENSES',
  payload: json,
});

function requestCambio() {
  return { type: 'REQUEST_API' };
}

// Action para salvar os dados da despesa
export const saveExpenses = (
  { value, description, currency, method, tag, id },
) => async (dispatch) => {
  dispatch(requestCambio());

  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((r) => r.json())
    .then((e) => dispatch(getExpenses({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: e,

    })));
};
