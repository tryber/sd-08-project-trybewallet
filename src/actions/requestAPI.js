export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';

export const reqAPI = () => ({
  type: REQUEST_API,
  payload: {
    isFetching: true,
  },
});

export const reqAPISuccess = (coins) => ({
  type: REQUEST_API_SUCCESS,
  payload: {
    isFetching: false,
    coins,
  },
});

export const reqAPIFail = (error) => ({
  type: REQUEST_API_ERROR,
  payload: {
    error,
    isFetching: false,
  },
});

export const fetchCoins = () => async (dispatch) => {
  dispatch(reqAPI());
  try {
    const req = await fetch('https://economia.awesomeapi.com.br/json/all');
    const coinsJson = await req.json();
    const filterCoins = [];
    Object.entries(coinsJson).forEach((coin) => {
      if (coin[1].name !== 'Dólar Turismo') filterCoins.push(coin[1]);
      // if (coin[0] !== 'USDT') filterCoins = [...filterCoins, coin[0]];
    });
    dispatch(reqAPISuccess(filterCoins));
  } catch (error) {
    dispatch(reqAPIFail(error));
  }
};
