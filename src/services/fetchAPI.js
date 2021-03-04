const fetchAPI = async () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const dataInfo = await fetch(endpoint);
  const dataJson = await dataInfo.json();
  delete dataJson.USDT;
  const datakeys = Object.keys(dataJson);
  // console.log(datakeys);
  return datakeys;
};

export default fetchAPI;
