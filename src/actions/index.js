import getAPI from '../services/requestAPI';

// criar um action para pegar o email
const actionEmail = (email) => ({
  type: 'UPEMAIL',
  email,
});

// action  para capitura  api curruncies da moeda
function arrayUPAPI(response) {
  return {
    type: 'UPAPI',
    value: response,
  };
}
const fetchCurrencies = () => (dispatch) => {
  getAPI().then((response) => dispatch(arrayUPAPI(response)));
};

// action  para capitura os state do form Expense
const actionExpenses = (UPexpenses) => ({
  type: 'UPEXPENSES',
  UPexpenses,
});

export { actionEmail, fetchCurrencies, actionExpenses };
