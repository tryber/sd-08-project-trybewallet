const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

async function requestApi() {
  const requestResponse = await fetch(ENDPOINT);
  return requestResponse.json().then((values) => values);
}

export default requestApi;
