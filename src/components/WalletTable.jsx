import React from 'react';
import { useSelector } from 'react-redux';
import WalletTableItem from './WalletTableItem';

const TABLE_HEADERS = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

function WalletTable() {
  const expenses = useSelector((state) => state.wallet.expenses);
  const expListBuilder = () => expenses.map((i) => {
    const { ask } = i.exchangeRates[i.currency];
    const calc = Number(ask * i.value).toFixed(2) || null;
    const { name } = i.exchangeRates[i.currency];
    return {
      id: i.id,
      value: i.value,
      description: i.description,
      currency: i.currency,
      tag: i.tag,
      name,
      ask,
      method: i.method,
      converted: calc,
    };
  });

  return (
    <table>
      <tbody>
        <tr role="row">
          {TABLE_HEADERS.map((i) => <th role="columnheader" key={ i }>{i}</th>)}
        </tr>
        {expListBuilder().map((expense) => (
          <WalletTableItem key={ expense.id } data={ expense } />)) || null}
      </tbody>
    </table>
  );
}

export default WalletTable;
