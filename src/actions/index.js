// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const GET_CURRENCIES = 'GET_CURRENCIES';
const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
const FAILED_REQUEST = 'FAILED_REQUEST';

const addRegister = (value) => ({ type: 'ADD_REGISTER', data: value });
export const deleteRegister = (value) => ({ type: 'DELETE_REGISTER', value });

export { LOGIN, GET_CURRENCIES, REQUEST_CURRENCIES, FAILED_REQUEST };

export default addRegister;
