// Coloque aqui suas actions
// fortemente inspirado em :
// https://github1s.com/tryber/sd-08-live-lectures/blob/lecture/16_5/students-register/src/actions/index.js
export const addRegister = (value) => ({ type: 'ADD_REGISTER', data: value });
export const deleteRegister = (value) => ({ type: 'DELETE_REGISTER', value });
export const login = (value) => ({ type: 'LOGIN', value });
