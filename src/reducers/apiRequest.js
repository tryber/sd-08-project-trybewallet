import { REQUEST_API, REQUEST_API_SUCCESS, REQUEST_API_ERRO } from '../store/consts';

const initialState = {
  exchangeRates: '',
};

function apiRequest(state = initialState, { type, payload }) {
  switch (type) {
  case REQUEST_API:
    return {
      ...state,
      isFetching: payload.isFetching,
    };
  case REQUEST_API_SUCCESS:
    console.log(payload);
    return {
      ...state,
      exchangeRates: payload,
      isFetching: payload.isFetching,
    };
  case REQUEST_API_ERRO:
    return {
      ...state,
      error: payload.error,
      isFetching: payload.isFetching,
    };
  default:
    return state;
  }
}

export default apiRequest;
