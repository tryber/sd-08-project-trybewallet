import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../actions';

const tagList = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const methodlist = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
function NewForm() {
  const id = useSelector((state) => state.wallet.id);
  const edit = useSelector((state) => state.wallet.edit);
  const currencyFromApi = useSelector((state) => state.wallet.currencies);
  const [item, setItem] = useState({});
  const [c, setClick] = useState('');
  const { walletAction: { receiveItemListAsync2 } } = allActions;
  const dispatch = useDispatch();
  useEffect(() => {
    setClick(edit['0']);
  }, []);
  function hg({ target: { name, value } }) {
    setItem({ ...item, [name]: value });
    setClick({ ...c, [name]: value });
  }
  function handleClick() {
    // dispatch(currencyList());
    dispatch(receiveItemListAsync2(c, id));
  }
  return (
    <form>
      {console.log(edit['0'])}
      <input
        data-testid="value-input"
        value={ c.value }
        type="text"
        name="value"
        onChange={ hg }
      />
      <input
        data-testid="description-input"
        name="description"
        value={ c.description }
        type="text"
        onChange={ hg }
      />
      <select name="currency" data-testid="currency-input" value={ c.currency } onChange={ hg }>
        { currencyFromApi
          .map((e, i) => <option key={ i } data-testid={ `${e}` }>{e}</option>)}
      </select>
      <select name="method" data-testid="method-input" value={ c.method } onChange={ hg }>
        {methodlist.map((e, i) => <option key={ i } data-testid={ `${e}` }>{e}</option>) }
      </select>
      <select name="tag" data-testid="tag-input" value={ c.tag } onChange={ hg }>
        {tagList.map((e, i) => <option key={ i } value={ e }>{ e }</option>)}
      </select>
      <button type="button" onClick={ handleClick }>Editar despesa</button>
    </form>
  );
}

export default NewForm;
