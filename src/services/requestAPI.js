const endPoint = 'https://economia.awesomeapi.com.br/json/all';

function requestAPI() {
  return fetch(endPoint).then((response) => response.json());
}

export default requestAPI;
