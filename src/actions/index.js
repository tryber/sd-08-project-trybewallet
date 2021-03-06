export const userAction = (value) => ({
  type: 'USER',
  value,
});

export const walletExpense = (value) => ({
  type: 'WALLET_EXPENSES',
  value,
});

export const walletCurrencie = (value) => ({
  type: 'WALLET_CURRENCIES',
  value,
});

export const excluirExpense = (value) => ({
  type: 'EXCLUIR',
  value,
});

export const fetchEconomia = () => async (dispatch) => {
  const responseApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const jsonApi = await responseApi.json();
  return dispatch(walletCurrencie(jsonApi));
};
