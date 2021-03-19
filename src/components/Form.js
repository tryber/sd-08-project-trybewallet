import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../actions';
import NewForm from './NewForm';

function Form() {
  const fetched = useSelector((state) => state.wallet2.fetched);
  const id = useSelector((state) => state.wallet2.id);
  const edited = useSelector((state) => state.wallet.edited);
  const currencyFromApi = useSelector((state) => state.wallet.currencies);

  const [item, setItem] = useState({});
  const [click, setClick] = useState('');

  const { walletAction: { currencyList, receiveItemListAsync } } = allActions;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currencyList());
  }, []);
  function handleChange({ target: { name, value } }) {
    setItem({ ...item, [name]: value });
    if (name === 'value') return setClick(value);
  }
  function handleClick() {
    // dispatch(currencyList());
    dispatch(receiveItemListAsync(item, id));
    setClick('');
  }
  if (edited) return <NewForm />;

  return (
    <form>
      <input data-testid="value-input" value={ click } type="text" name="value" onChange={ handleChange } />
      <input data-testid="description-input" name="description" type="text" onChange={ handleChange } />
      { fetched
      && <select name="currency" data-testid="currency-input" onChange={ handleChange }>
        {currencyFromApi !== undefined && currencyFromApi.map((element, index) => <option key={ index } data-testid={ `${element}` }>{element}</option>) }
      </select>}
      <select name="method" data-testid="method-input" onChange={ handleChange }>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
      <select name="tag" data-testid="tag-input" onChange={ handleChange }>
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
      <button type="button" onClick={ handleClick }>Adicionar despesa</button>
    </form>
  );
}

export default Form;
