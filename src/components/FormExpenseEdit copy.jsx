import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';

import CurrencySelect from './CurrencySel';
import PayMethodSelect from './MethodSel';
import TagSelect from './Tagsel';

const INITIAL_VALUE = {
  value: '0',
  description: '',
  currency: 'USD',
  tag: 'Alimentação',
  method: 'Dinheiro',
};

function FormExpenseEdit() {
  const expenses = useSelector((state) => state.wallet.expenses);
  const editid = useSelector((state) => state.wallet.editid);
  const [data, setData] = useState({ ...expenses.find((i) => i.id === editid) });
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleEditExpense = async () => {
    console.log(data);
    dispatch(actions.editExpense({ ...data }));
    setData(INITIAL_VALUE);
    dispatch(actions.exitEditMode());
  };
  const { value, description, currency, tag, method } = data;
  return (
    <div className="edit-area">
      <h2>Editar</h2>
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
    </div>
  );
}

export default FormExpenseEdit;
