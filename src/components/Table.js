import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../actions';

function Table() {
  const { walletAction: { deleteFromList } } = allActions;
  const dispatch = useDispatch();
  const list = useSelector((state) => state.wallet.expenses);
  // const [localTotal, setTotal] = useState({});
  function clickHandle({ target: { value, name } }) {
    dispatch(deleteFromList(value, name));
  }
  // useEffect(() => {
  //   dispatch(actualTotal());
  // });
  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>

        </tr>
      </thead>
      {list.map(({ value, description, currency, method, tag, id, exchangeRates }) => (
        <tbody key={ id }>
          <tr>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{value}</td>
            <td>{exchangeRates[currency].name}</td>
            <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
            <td>{(Number(exchangeRates[currency].ask) * Number(value))}</td>
            <td>Real</td>
            <td>
              <button data-testid="delete-btn" type="button" name={ (Number(exchangeRates[currency].ask) * Number(value)) } value={ id } onClick={ clickHandle }>AAAAS</button>
              {/* <button type="button" data-testid="edit-btn" onClick={ dispatch(edit(id)) }>EDITAR</button> */}
            </td>
          </tr>
        </tbody>

      ))}

    </table>
  );
}

export default Table;
