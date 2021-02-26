import React from 'react';
import { useSelector } from 'react-redux';

export default function WalletHeader() {
  const user = useSelector((state) => state.user);
  const { expenses, firstExpense } = useSelector((state) => state.wallet);

  function calcExpenses() {
    return expenses.reduce((accumulator, actual) => {
      const { currency, exchangeRates } = actual;
      const { ask } = exchangeRates[currency];
      accumulator += Number(actual.value) * Number(ask);
      return accumulator;
    }, 0);
  }
  return (
    <header>
      <div data-testid="email-field">{user.email}</div>
      <div data-testid="total-field">
        {(firstExpense && expenses && calcExpenses()) || 0}
      </div>
      <div data-testid="header-currency-field">BRL</div>
    </header>
  );
}
