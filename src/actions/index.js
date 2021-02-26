// criar um action para pegar o email e jogar no dispatch
const actionEmail = (email) => ({
  type: 'UPEMAIL',
  email,
});

const actionCurruncies = (value) => ({
  type: 'UPAPI',
  value,
});
export { actionEmail, actionCurruncies };
