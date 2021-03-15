import { GET_CURRENCIES } from './index';

const actionWallet = (currencies) => ({
  type: GET_CURRENCIES,
  payload: {
    currencies,
  },
});

export default actionWallet;
