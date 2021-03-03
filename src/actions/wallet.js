const getCurrencies = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  return response.json();
};

const saveCurrencies = (currencies) => ({
  type: 'SAVE_CURRENCY',
  obj: currencies,
});

const getRequest = () => async (dispatch) => {
  await getCurrencies()
    .then((data) => dispatch(saveCurrencies(data)));
};

export default getRequest;
