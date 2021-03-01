const getQuotations = async () => {
  const data = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((res) => res.json());
  return data;
};

export default getQuotations;
