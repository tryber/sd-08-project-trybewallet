const getCurr = async () => {
  const FETCH_URL = 'https://economia.awesomeapi.com.br/json/all';
  const result = await fetch(FETCH_URL);
  return result.json();
};

export default getCurr;
