import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';

import CurrencySelect from './CurrencySelect';
import PayMethodSelect from './PayMethodSelect';
import TagSelect from './TagSelect';

const INITIAL_VALUE = {
  value: '0',
  description: '',
  currency: 'USD',
  tag: 'Alimentação',
  method: 'Dinheiro',
};

const getId = (arr) => {
  if (arr.length > 0) {
    return arr[arr.length - 1].id + 1;
  }
  return 0;
};

function FormExpense() {
  const [data, setData] = useState(INITIAL_VALUE);
  const expenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleAddExpense = async () => {
    const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());
    dispatch(actions.addExpense({ id: getId(expenses), ...data, exchangeRates }));
    setData(INITIAL_VALUE);
  };
  const { value, description, currency, tag, method } = data;
  return (
    <form>
      <label htmlFor="value">
        Valor:
        <input
          type="text"
          value={ value }
          name="value"
          data-testid="value-input"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          value={ description }
          name="description"
          data-testid="description-input"
          onChange={ handleChange }
        />
      </label>
      <CurrencySelect value={ currency } onChange={ handleChange } />
      <PayMethodSelect value={ method } onChange={ handleChange } />
      <TagSelect value={ tag } onChange={ handleChange } />
      <button type="button" onClick={ handleAddExpense }>Adicionar despesa</button>
    </form>
  );
}

export default FormExpense;
