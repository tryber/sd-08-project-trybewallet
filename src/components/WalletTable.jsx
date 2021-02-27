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
    return {
      id: i.id,
      value: i.value,
      description: i.description,
      currency: i.currency,
      tag: i.tag,
      method: i.method,
      converted: calc,
    };
  });

  return (
    <table className="wallet-table">
      <tbody>
        <tr>
          {TABLE_HEADERS.map((i) => <th className="wth-header" key={ i }>{i}</th>)}
        </tr>
        {expListBuilder().map((expense) => (
          <WalletTableItem key={ expense.id } data={ expense } />)) || null}
      </tbody>
    </table>
  );
}

export default WalletTable;
