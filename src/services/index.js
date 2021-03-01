export const fetchData = () => (
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((resp) => resp.json())
    .catch((erro) => console.log(erro))
);
export { formatInputNumber, toNumericValue } from './textAndNumber';
