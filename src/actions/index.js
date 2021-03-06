// Coloque aqui suas actions
// fortemente inspirado em :
// https://github1s.com/tryber/sd-08-live-lectures/blob/lecture/16_5/students-register/src/actions/index.js
// export const addRegister = (value) => ({ type: 'ADD_REGISTER', data: value });
// export const deleteRegister = (value) => ({ type: 'DELETE_REGISTER', value });
import { getCurrentCurrencies } from '../service/API';
import {
  ADD_REGISTER, DELETE_REGISTER, LOGIN, REQUEST_API,
  REQUEST_API_SUCCESS, REQUEST_API_ERRO } from '../store/consts';

// export const LOGIN = 'LOGIN';
// export const ADD_REGISTER = 'ADD_REGISTER';
// export const DELETE_REGISTER = 'DELETE_REGISTER';
// export const REQUEST_API = 'REQUEST_API';
// export const REQUEST_API_ERRO = 'REQUEST_API_ERRO';
// export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';

export const login = (email) => ({
  type: LOGIN,
  payload: email,
});

export const addRegister = (data) => ({
  type: ADD_REGISTER,
  payload: data,
});
export const deleteRegister = (register) => ({
  type: DELETE_REGISTER,
  payload: [register],
});

export const requestAPI = () => ({
  type: REQUEST_API,
  payload: {
    isFetching: true,
  },
});

export const requestAPIErro = (error) => ({
  type: REQUEST_API_ERRO,
  payload: {
    error,
    isFetching: false,
  },
});

export const requestAPISuccess = (payload) => ({
  type: REQUEST_API_SUCCESS,
  payload,
});

export const GetAPIData = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const Response = await getCurrentCurrencies();
    dispatch(
      requestAPISuccess(Response),
    );
  } catch (error) {
    dispatch(
      requestAPIErro(),
    );
  }
};
