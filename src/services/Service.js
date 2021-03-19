// Fiz com a ajuda da Vivi
export default async function getCurrency() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((curr) => Object.keys(curr).filter((i) => i !== 'USDT'));
}

export async function getExchangeRate() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      delete data.USDT;
      return data;
    });
}
