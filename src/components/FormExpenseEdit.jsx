import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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

function FormExpenseEdit({ id }) {
  const expenses = useSelector((state) => state.wallet.expenses);
  const [data, setData] = useState([...expenses.find((i) => i.id === id)]);
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleEditExpense = async () => {
    dispatch(actions.editExpense(...data));
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
      <button type="button" onClick={ handleEditExpense }>Editar despesa</button>
    </form>
  );
}

FormExpenseEdit.propTypes = {
  id: PropTypes.number.isRequired,
};

export default FormExpenseEdit;
