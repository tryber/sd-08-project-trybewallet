const currencyRequest = () => ({
  type: 'FETCH_REQUEST',
  payload: true,
});
const currencyRequestSucess = (response) => ({
  type: 'FETCH_REQUEST_SUCESS',
  payload: response,
});

const currencyList = () => async (dispatch) => {
  dispatch(currencyRequest());
  // const urlAllCurrency = 'https://economia.awesomeapi.com.br/json/all';
  const currencyResponse = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  dispatch(currencyRequestSucess(currencyResponse));
};

const receiveItemList = (item) => ({
  type: 'Item',
  payload: item,
});

const receiveItemListAsync = (item, id) => async (dispatch) => {
  const currencyResponse = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  item.exchangeRates = currencyResponse;
  item.id = id;
  dispatch(receiveItemList(item));
};

export default {
  currencyRequest,
  currencyRequestSucess,
  currencyList,
  receiveItemList,
  receiveItemListAsync,
};
