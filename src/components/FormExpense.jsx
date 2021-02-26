import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';

import CurrencySelect from './CurrencySelect';
import PayMethodSelect from './PayMethodSelect';
import TagSelect from './TagSelect';

const INITIAL_VALUE = {
  value: 0,
  description: '',
  currency: '',
  tag: 'Alimentação',
  method: 'Dinheiro',
};

function FormExpense() {
  const [data, setData] = useState(INITIAL_VALUE);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleAddExpense = () => {
    dispatch(actions.addExpense(data));
  };
  const { value, description, currency, tag, method } = data;
  return (
    <form>
      <label htmlFor="value">
        Valor:
        <input
          type="number"
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
