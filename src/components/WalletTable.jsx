import React from 'react';
import { useSelector } from 'react-redux';
// import * as actions from '../actions';
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
  '',
];

function WalletTable() {
  const expenses = useSelector((state) => state.wallet.expenses);
  // const dispatch = useDispatch();

  const expListBuilder = () => expenses.map((i) => {
    const { ask } = i.exchangeRates[i.currency];
    const calc = Number(Number(Number(i.value) * Number(ask)).toFixed(2));
    console.log(ask);
    return {
      id: i.id,
      value: i.value,
      description: i.description,
      currency: i.currency,
      tag: i.tag,
      method: i.method,
      converted: calc || null,
    };
  });

  return (
    <table>
      <tbody>
        <tr>
          {TABLE_HEADERS.map((i) => <th key={ i }>{i}</th>)}
        </tr>
        {expListBuilder().map((expense) => (
          <WalletTableItem key={ expense.id } data={ expense } />)) || null}
      </tbody>
    </table>
  );
}

export default WalletTable;
