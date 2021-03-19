import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../actions';

const array = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
  'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
const E = 'EDITAR';
function Table() {
  const { walletAction: { deleteFromList, edit, desrenderizarForm } } = allActions;
  const dispatch = useDispatch();
  const list = useSelector((state) => state.wallet.expenses);
  function clickHandle({ target: { value, name } }) {
    dispatch(deleteFromList(value, name));
  }
  function editH() {
    dispatch(desrenderizarForm());
    dispatch(edit(list));
  }
  return (
    <table>
      <thead>
        <tr>
          {array.map((element, index) => <th key={ index }>{element}</th>)}
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
              <button
                data-testid="delete-btn"
                type="button"
                name={ (Number(exchangeRates[currency].ask) * Number(value)) }
                value={ id }
                onClick={ clickHandle }
              >
                AAAAS
              </button>
            </td>
            <td>
              <button type="button" data-testid="edit-btn" onClick={ editH }>{E}</button>
            </td>
          </tr>
        </tbody>
      ))}

    </table>
  );
}

export default Table;
