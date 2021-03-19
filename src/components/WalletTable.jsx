import React from 'react';
import { useSelector } from 'react-redux';
import DeleteOrEditButton from './DeleteOrEditButton';

export default function WalletTable() {
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
                <DeleteOrEditButton indexProps={ index } />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
