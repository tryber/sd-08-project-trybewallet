// Coloque aqui suas actions
// fortemente inspirado em :
// https://github1s.com/tryber/sd-08-live-lectures/blob/lecture/16_5/students-register/src/actions/index.js
// export const addRegister = (value) => ({ type: 'ADD_REGISTER', data: value });
// export const deleteRegister = (value) => ({ type: 'DELETE_REGISTER', value });
import { ADD_REGISTER, DELETE_REGISTER, LOGIN } from '../store/consts';

export const login = (email) => ({
  type: LOGIN,
  payload: email,
});

export const addRegister = (register) => ({
  type: ADD_REGISTER,
  payload: [register],
});

export const deleteRegister = (register) => ({
  type: DELETE_REGISTER,
  payload: [register],
});
