// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initial = {
  currencies: [],
  expenses: [],
};

export default (state = initial, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
// Nota mental: sempre retornar o estado anterior
// junto com o update recebido pela action.
