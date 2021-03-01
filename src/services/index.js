const fetchCurrency = () => (
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((r) => (r.json()
      .then(
        (json) => (r.ok ? Promise.resolve(json) : Promise.reject(json)),
      )
    ))
);

export default fetchCurrency;
