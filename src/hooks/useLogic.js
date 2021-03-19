import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { currenciesSave, expanseSave } from '../actions';
import getCurrency from '../services/index';

function useLogic() {
  const [currency, setCurrency] = useState([]);
  const [id, setId] = useState(0);
  const [expanseValue, setExpanseValue] = useState(0);
  const [expanseDescription, setExpanseDescription] = useState('');
  const [expanseCurrency, setExpanseCurrency] = useState('USD');
  const [paymentMethod, setPaymentMethod] = useState('dinheiro');
  const [expenseCategory, setExpenseCategory] = useState('alimentacao');
  const expanse = {
    id,
    value: expanseValue,
    description: expanseDescription,
    currency: expanseCurrency,
    method: paymentMethod,
    tag: expenseCategory,
  };
  const dispatch = useDispatch();
  const clearForm = () => {
    setExpanseValue(0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getCurrency().then((currencies) => {
      const expansePlusExchangeRates = {
        ...expanse,
        exchangeRates: currencies,
      };
      setId(id + 1);
      dispatch(expanseSave(expansePlusExchangeRates));
    });
    clearForm();
  };

  return {
    currency,
    setCurrency,
    setExpanseValue,
    setExpanseDescription,
    setExpanseCurrency,
    setPaymentMethod,
    setExpenseCategory,
    handleSubmit,
    currenciesSave,
    expanseValue,
    expanseDescription,
    expanseCurrency,
    paymentMethod,
    expenseCategory,
  };
}

export default useLogic;
