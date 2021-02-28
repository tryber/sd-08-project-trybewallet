// criar um action para pegar o email e jogar no dispatch
const actionEmail = (email) => ({
  type: 'UPEMAIL',
  email,
});

function arrayUPAPI(response) {
  return {
    type: 'UPAPI',
    value: response,
  };
}
const actionCurruncies = (value) => (dispatch) => {
  value.then((response) => dispatch(arrayUPAPI(response)));
};

const actionExpenses = (UPexpenses) => ({
  type: 'UPEXPENSES',
  UPexpenses,
});
export { actionEmail, actionCurruncies, actionExpenses };
