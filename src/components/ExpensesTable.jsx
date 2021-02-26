import React from 'react';
import { useSelector } from 'react-redux';
import tableHeaders from '../helpers/constants';

export default function ExpensesTable() {
  const expenses = useSelector((state) => state.wallet.expenses);
  function generateHeaders() {
    return tableHeaders.map((e) => (
      <th key={ e }>{e}</th>
    ));
  }

  function generateExpenses() {
    // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    function roundToTwo(num) {
      return Math.round((num + Number.EPSILON) * 100) / 100;
    }
    return expenses.map((e) => {
      const { currency, exchangeRates } = e;
      const { ask, name } = exchangeRates[currency];
      return (
        <tr key={ e.id } role="row">
          <td role="cell">{ e.description }</td>
          <td role="cell">{ e.tag }</td>
          <td role="cell">{ e.method }</td>
          <td role="cell">{ roundToTwo(Number(e.value)) }</td>
          <td role="cell">{ name }</td>
          <td role="cell">{ roundToTwo(Number(ask)) }</td>
          <td role="cell">{ roundToTwo((Number(e.value) * Number(ask))) }</td>
          <td role="cell">Real</td>
        </tr>
      );
    });
  }
  return (
    <table className="w-100">
      <tbody>
        <tr>
          {generateHeaders()}
        </tr>
        {expenses && generateExpenses()}
      </tbody>
    </table>
  );
}
