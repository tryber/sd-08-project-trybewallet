// constant

export const ADD_LOGIN = 'ADD_LOGIN';
export const FLAG = 'FLAG';
export const DEL_EXPENSE = 'DEL_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const URL = 'https://economia.awesomeapi.com.br/json/all';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_ADD_EXPENDITURE = 'GET_CURRENCIES_ADD_EXPENDITURE';
export const payMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
export const expenditures = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
export const delayFetch = 2000;
export const tableHeaders = [
  'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
  'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
];
export const localCurrency = { code: 'BRL', ask: 1, name: 'Real' };
