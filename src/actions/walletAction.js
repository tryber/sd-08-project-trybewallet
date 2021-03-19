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
  delete currencyResponse.USDT;// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
  const arrayObjc = Object.keys(currencyResponse);
  dispatch(currencyRequestSucess(arrayObjc));
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

const receiveItemListAsync2 = (item, id) => ({
  type: 'superedited',
  payload: item,
  numberr: id,
});

const deleteFromList = (id, name) => ({
  type: 'DELETE_ITEM',
  payload: Number(id),
  sub: Number(name),
});
const edit = (id) => ({
  type: 'EDIT',
  payload: id,
});
const desrenderizarForm = () => ({
  type: 'DES_FORM',
});

export default {
  currencyRequest,
  currencyRequestSucess,
  currencyList,
  receiveItemList,
  receiveItemListAsync,
  deleteFromList,
  edit,
  desrenderizarForm,
  receiveItemListAsync2,
};
