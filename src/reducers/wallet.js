// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import types from '../actions/types';

const initial = {
  currencies: [],
  expenses: [],
  expenseId: 0,
};

export default (state = initial, action) => {
  const expenseToAdd = {
    id: state.expenseId,
    ...action.payload,
  };
  switch (action.type) {
  case types.FETCH_CURRENCIES:
    return {
      ...state,
      currencies: [...action.payload],
    };
  case types.ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, expenseToAdd],
      expenseId: state.expenseId + 1,
    };
  default:
    return state;
  }
};
// Nota mental: sempre retornar o estado anterior
// junto com o update recebido pela action.
