const fs = require('fs');
const fetch = require('node-fetch');

const fetchCurrency = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((res) => res.json())
    .then((data) => Object.keys(data).filter((i) => i !== 'USDT'));

  fs.writeFileSync('currency.json', JSON.stringify(response));
};

fetchCurrency();
