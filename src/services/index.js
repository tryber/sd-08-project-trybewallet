export default function getCurrency() {
  return fetch('https://economia.awesomeapi.com.br/json/all/')
    .then((data) => data.json());
}
