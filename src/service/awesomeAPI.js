const URL_API = 'https://economia.awesomeapi.com.br/json/all';

export const getQuotation = () => fetch(URL_API).then((response) => (
  response.json()
    .then((json) => json)
));

export default getQuotation;
