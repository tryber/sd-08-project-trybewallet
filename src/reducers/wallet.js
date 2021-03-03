import { Types } from '../actions/wallet.action';

const expenses = [{
  "id": 0,
  "value": "3",
  "description": "Hot Dog",
  "currency": "USD",
  "method": "Dinheiro",
  "tag": "Alimentação",
  "exchangeRates": {
    "USD": {
      "code": "USD",
      "name": "Dólar Comercial",
      "ask": "5.6208",
    },
    "CAD": {
      "code": "CAD",
      "name": "Dólar Canadense",
      "ask": "4.2313",
    },
    "EUR": {
      "code": "EUR",
      "name": "Euro",
      "ask": "6.6112",
    },
    "GBP": {
      "code": "GBP",
      "name": "Libra Esterlina",
      "ask": "7.2498",
    },
    "ARS": {
      "code": "ARS",
      "name": "Peso Argentino",
      "ask": "0.0729",
    },
    "BTC": {
      "code": "BTC",
      "name": "Bitcoin",
      "ask": "60299",
    },
    "LTC": {
      "code": "LTC",
      "name": "Litecoin",
      "ask": "261.69",
    },
    "JPY": {
      "code": "JPY",
      "name": "Iene Japonês",
      "ask": "0.05301",
    },
    "CHF": {
      "code": "CHF",
      "name": "Franco Suíço",
      "ask": "6.1297",
    },
    "AUD": {
      "code": "AUD",
      "name": "Dólar Australiano",
      "ask": "4.0124",
    },
    "CNY": {
      "code": "CNY",
      "name": "Yuan Chinês",
      "ask": "0.8278",
    },
    "ILS": {
      "code": "ILS",
      "name": "Novo Shekel Israelense",
      "ask": "1.6514",
    },
    "ETH": {
      "code": "ETH",
      "name": "Ethereum",
      "ask": "5184",
    },
    "XRP": {
      "code": "XRP",
      "name": "Ripple",
      "ask": "1.4",
    }
  }
}]

const initialState = {
  currencies: [],
  expenses: [],
  idCount: 0,
};

const saveCurrencies = (state = initialState, action) => ({
  ...state, currencies: action.payload,
});

const addExpense = (state = initialState, action) => {
  const newExpense = {
    id: state.idCount,
    ...action.payload,
  };
  return {
    ...state,
    expenses: [...state.expenses, newExpense],
    idCount: state.idCount + 1,
  };
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case Types.SAVE_CURRENCIES:
    return saveCurrencies(state, action)
  case Types.ADD_EXPENSE:
    return addExpense(state, action)
  case Types.ADD_EXPENSE_WITH_CURRENCIES:
    return {
      ...state, expenses: [...state.expenses, {id: state.idCount,...action.payload}], idCount: state.idCount + 1
    }
  default:
    return state;
  }
}

export default wallet;
