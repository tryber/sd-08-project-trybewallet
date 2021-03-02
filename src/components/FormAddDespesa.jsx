import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';

import CurrencySel from './CurrencySel';
import MethodSel from './MethodSel';
import TagSel from './Tagsel';

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

function FormAddDespesa() {
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&variaveis para uso geral&&&&&&&&&&&&&&&&&&&&&&
  const [data, setData] = useState(INITIAL_VALUE);
  const expenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();

  // ############################## funções para uso geral #######################
  function handleChange({ target }) {
    const { name, value } = target;
    setData({ ...data, [name]: value });
  }
  const handleAddExpense = async () => {
    const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());
    dispatch(actions.addExpense({ id: getId(expenses), ...data, exchangeRates }));
    setData(INITIAL_VALUE);
  };
  const { tag, currency, value, description, method } = data;
  // #####################formulário de despesas##################################
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
      <CurrencySel value={ currency } onChange={ handleChange } />
      <MethodSel value={ method } onChange={ handleChange } />
      <TagSel value={ tag } onChange={ handleChange } />
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
      <button type="button" onClick={ handleAddExpense }>Adicionar despesa</button>
    </form>
  );
}

export default FormAddDespesa;
