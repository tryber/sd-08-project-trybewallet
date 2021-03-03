const CURRENCY_API = 'https://economia.awesomeapi.com.br/json/all';

export const getCurrencyV1 = () => new Promise((resolve, reject) => {
  fetch(CURRENCY_API)
    .then((response) => response.json()
      .then((json) => {
        if (response.ok) {
          resolve(json);
        } else {
          reject(json);
        }
      }));
});

export const getCurrencyV2 = () => fetch(CURRENCY_API)
  .then((response) => (
    response
      .json()
      .then((json) => {
        if (response.ok) {
          Promise.resolve(json);
        } else {
          Promise.reject(json);
        }
      })
  ));

export const getCurrency = () => ( // ATENCAO ao '(' q abre
  // isso ja retorna oq esta dentro!!
  fetch(CURRENCY_API)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const getCurrencyV4 = async () => {
  const response = await fetch(CURRENCY_API);
  const currency = await response.json();
  if (response.ok) {
    return currency;
  }
  throw currency;
};
