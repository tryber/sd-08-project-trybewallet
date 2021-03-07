// Coloque aqui suas actions
import { getQuotation } from '../service/awesomeAPI';

export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_QUOTATION = 'REQUEST_QUOTATION';
export const QUOTATION_DATA = 'QUOTATION_DATA';
export const EXPENCE_DATA = 'EXPENCE_DATA';

export const userLogin = (user) => ({
  type: USER_LOGIN,
  user,
});

export const requestQuotation = () => ({
  type: REQUEST_QUOTATION,
  payload: {
    isFetching: true,
  },
});

export const quotationData = (data) => ({
  type: QUOTATION_DATA,
  payload: { allquotation: data },
});

export const expenceData = (expencesData) => ({
  type: EXPENCE_DATA,
  payload: { expenses: [expencesData] },
});

export const fetchGetQuotation = () => async (dispatch) => {
  dispatch(requestQuotation());
  const getQuotationResponse = await getQuotation();
  dispatch(
    quotationData(getQuotationResponse),
  );
};
