import { GET_CURRENCIES, GET_EXPENSES, TOTAL_EXPENSES } from './constants';
import getAPI from '../services/RequestApi';

export const getCurrencies = (Currencies) => ({
  type: GET_CURRENCIES,
  Currencies,
});
export const getExpenses = ({
  get_Expenses: {
    id,
    value,
    currency,
    method,
    tag,
    description,
    exchangeRates,
  },
}) => ({
  type: GET_EXPENSES,
  get_Expenses: {
    id,
    value,
    currency,
    method,
    tag,
    description,
    exchangeRates,
  },
});
export const MakeTotalExpenses = (totalExpenses) => ({
  type: TOTAL_EXPENSES,
  totalExpenses,
});

export function fetchAPI() {
  return async (dispatch) => {
    try {
      const apiRequest = await getAPI();
      const apiResponseObjects = Object.entries(apiRequest);
      dispatch(getCurrencies(apiResponseObjects));
    } catch (error) {
      return error;
    }
  };
}

// const test = await getAPI();
// const t = Object.entries(test);
// const j = Array.from(t);
// const loc = j.filter((item) => {
//   return item[1].code === mo;
// });
// h = loc[0][1];
// sum = h.ask * vl;
// console.log(sum);
// }
