import fetchCoins from '../services';

export const USER_EMAIL = 'USER_EMAIL';
export const ADD_DESPESA = 'ADD_DESPESA';
export const EDIT_DESPESA = 'EDIT_DESPESA';
export const DELETE_DESPESA = 'DELETE_DESPESA';
export const UPDATE_COIN = 'UPDATE_COIN';
export const BT_BOOL = 'BT_BOOL';
export const FETCH_COINS = 'FETCH_COIN';
export const SAVE_COINS = 'SAVE_COIN';

export const addUser = (email) => ({
  type: USER_EMAIL,
  email,
});

export const addDespesa = (payload) => ({
  type: ADD_DESPESA,
  payload,
});

export const editDespesa = (payload) => ({
  type: EDIT_DESPESA,
  payload,
});

export const deleteDespesa = (id) => ({
  type: DELETE_DESPESA,
  id,
});

export const updateCoin = (payload) => ({
  type: UPDATE_COIN,
  payload,
});

export const btKey = (payload) => ({
  type: BT_BOOL,
  payload,
});

export const saveCoins = (currencies) => ({
  type: SAVE_COINS,
  payload: currencies,
});

export const fetchCurrencyFilter = () => async (dispatch) => {
  const allCoins = await fetchCoins();
  const arrayCoins = Object.keys(allCoins);
  const coinsFilter = arrayCoins.filter((currency) => currency !== 'USDT');
  dispatch(saveCoins(coinsFilter));
};
