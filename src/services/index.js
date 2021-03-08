import { APIURL } from '../const';

const fetchApiCurrencies = () => (
  fetch(APIURL)
    .then((response) => (
      response
        .json()
        .then((json) => (Promise.resolve(json)))/* .then((x) => (console.log(x))) */
        .catch((json) => (Promise.reject(json)))
    ))
);

export default fetchApiCurrencies;
