import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../actions';
import NewForm from './NewForm';

const tagList = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const methodlist = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
function Form() {
  const f = useSelector((state) => state.wallet2.fetched);
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
  function handleC({ target: { name, value } }) {
    setItem({ ...item, [name]: value });
    if (name === 'value') return setClick(value);
  }
  function handleClick() {
    dispatch(receiveItemListAsync(item, id));
    setClick('');
  }
  if (edited) return <NewForm />;
  return (
    <form>
      <input
        type="text"
        value={ click }
        data-testid="value-input"
        name="value"
        onChange={ handleC }
      />
      <input
        data-testid="description-input"
        name="description"
        type="text"
        onChange={ handleC }
      />
      { f && (<select name="currency" data-testid="currency-input" onChange={ handleC }>
        {currencyFromApi !== undefined && currencyFromApi
          .map((e, i) => <option key={ i } data-testid={ `${e}` }>{e}</option>) }
     </select>)}
      <select name="method" data-testid="method-input" onChange={ handleC }>
        {methodlist.map((e, i) => <option key={ i } value={ e }>{ e }</option>)}
      </select>
      <select name="tag" data-testid="tag-input" onChange={ handleC }>
        {tagList.map((e, i) => <option key={ i } value={ e }>{ e }</option>)}
      </select>
      <button type="button" onClick={ handleClick }>Adicionar despesa</button>
    </form>
  );
}

export default Form;
