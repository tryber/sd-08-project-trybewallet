import { USER_EMAIL, WALLET_CURRENCIES, WALLET_EXPENSES } from './index';

export function actionUserEmail(email) {
  return {
    type: USER_EMAIL,
    email,
  };
}

function arrayValues(answer) {
  return {
    type: WALLET_CURRENCIES,
    data: answer,
  };
}

export function actionWalletCurrencies(dataAPI) {
  return (dispatch) => {
    dataAPI.then((answer) => dispatch(arrayValues(answer)));
  };
}

export function actionWalletExpenses(expenses) {
  return {
    type: WALLET_EXPENSES,
    expenses,
  };
}
