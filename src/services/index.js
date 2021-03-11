import { API_URL } from '../const';

const fetchApiCurrencies = () => (
  fetch(API_URL)
    .then((response) => (
      response
        .json()
        .then((json) => (Promise.resolve(json)))/* .then((x) => (console.log(x))) */
        .catch((json) => (Promise.reject(json)))
    ))
);

export default fetchApiCurrencies;
