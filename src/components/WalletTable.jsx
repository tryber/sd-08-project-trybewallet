import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { expanseDelete } from '../actions';

export default function WalletTable() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { wallet } = store;
  return (
    <table>
      <thead>
        <tr>
          <th>Moeda</th>
          <th>Valor</th>
          <th>Câmbio utilizado</th>
          <th>Moeda de conversão</th>
          <th>Valor convertido</th>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {wallet.expenses.map((expense, index) => {
          const { description, tag, method, value, currency,
            exchangeRates } = expense;
          const { name, ask } = exchangeRates[currency];
          return (
            <tr key={ index }>
              <td>{name}</td>
              <td>{value}</td>
              <td>{parseFloat(ask).toFixed(2)}</td>
              <td>Real</td>
              <td>{(ask * parseInt(value, 10)).toFixed(2)}</td>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>
                <button
                  type="button"
                  onClick={ () => dispatch(expanseDelete(index)) }
                  data-testid="delete-btn"
                >
                  Deletar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
