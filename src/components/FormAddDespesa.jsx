import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';

const INITIAL_VALUE = {
  value: '0',
  description: '',
  currency: 'USD',
  tag: 'Alimentação',
  method: 'Dinheiro',
};

export default function formAddDespesa() {
  const [data, setData] = useState(INITIAL_VALUE);
  const expenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();

  // lembrar de dar o nome igual a chave
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({
      ...data,
      [name]: value,
    });
  };
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
      <input
        type="text"
        value="descrição da despesa"
        data-testid="description-input"
        onChange={ handlechange }
      />
      <input
        type="text"
        value="valor da despesa"
        data-testid="value-input"
        onChange={ handlechange }
      />
      <button type="button" onClick={ handleAddExpense }>Adicionar despesa</button>
    </form>
  );
}
