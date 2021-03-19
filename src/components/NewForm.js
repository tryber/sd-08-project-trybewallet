import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../actions';

function NewForm() {
  const id = useSelector((state) => state.wallet.id);
  const edit = useSelector((state) => state.wallet.edit);
  const currencyFromApi = useSelector((state) => state.wallet.currencies);
  const [item, setItem] = useState({});
  const [click, setClick] = useState('');
  const { walletAction: { receiveItemListAsync2 } } = allActions;
  const dispatch = useDispatch();
  useEffect(() => {
    setClick(edit['0']);
  }, []);
  function handleChange({ target: { name, value } }) {
    setItem({ ...item, [name]: value });
    setClick({ ...click, [name]: value });
    // if (name === 'value') return setClick(value);
  }
  function handleClick() {
    // dispatch(currencyList());
    dispatch(receiveItemListAsync2(click, id));
  }
  // if (edit.value === undefined) return <h1>Loading</h1>;
  return (
    <form>
      {console.log(edit['0'])}
      <input data-testid="value-input" value={ click.value } type="text" name="value" onChange={ handleChange } />
      <input data-testid="description-input" name="description" value={ click.description } type="text" onChange={ handleChange } />
       <select name="currency" data-testid="currency-input" value={ click.currency } onChange={ handleChange }>
        {currencyFromApi.map((element, index) => <option key={ index } data-testid={ `${element}` }>{element}</option>) }
         </select>
      <select name="method" data-testid="method-input" value={ click.method } onChange={ handleChange }>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
      <select name="tag" data-testid="tag-input" value={ click.tag } onChange={ handleChange }>
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
      <button type="button" onClick={ handleClick }>Editar despesa</button>
    </form>
  );
}

export default NewForm;
