const URL = 'https://economia.awesomeapi.com.br/json/all';

function fetchApi() {
  const request = fetch(URL)
    .then((resp) => resp.json());
  return request;
}

export default fetchApi;
