// Coloque aqui suas actions
export const ADCIONAR_EMAIL = 'ADCIONAR_EMAIL';
export const FET_API = 'FET_API';

export const adcionarEmail = (value) => ({
  type: ADCIONAR_EMAIL,
  value,
});

function getApi(json) {
  return { type: FET_API, payload: json };
}

export function fetApi(dispatch) {
  return fetch('https://dog.ceo/api/breeds/image/random')
    .then((r) => r.json()
      .then((json) => dispatch(getApi(json))));
}
