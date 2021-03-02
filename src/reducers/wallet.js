// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import * as walletAction from '../actions/wallet';

const initialStateWallet = {
  currencies: [],
  expenses: [],
  loading: false,
};

const wallet = (state = initialStateWallet, action) => {
  switch (action.type) {
  case walletAction.REQUEST_TO_API:
    return { ...state, loading: true };

  case walletAction.REQUEST_FAIL:
    return { ...state, loading: false, error: action.error };

  case walletAction.REQUEST_SUCESS:
    return {
      ...state,
      loading: false,
      currencies: [...Object.values(action.currencies)
        .filter((noUSTD) => noUSTD.name !== 'Dólar Turismo')],
    };

  default:
    return initialStateWallet;
  }
};

export default wallet;
