// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  totalSpend: 0,
};

const wallet = (state = INITIAL_STATE) => {
  const CASETEST = 'TESTE';
  switch (CASETEST) {
  case 'SAVE_EXPENSE':
    return state;
  default:
    return INITIAL_STATE;
  }
};

export default wallet;
