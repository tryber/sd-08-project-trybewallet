import React from 'react';
import { useSelector } from 'react-redux';

function totalFieldCalculation(walletState) {
  const { expenses } = walletState;
  let total = 0;
  if (expenses.length > 0) {
    expenses.forEach((expense) => {
      const { currency, value, exchangeRates: { [currency]: { ask } } } = expense;
      total += (ask * value);
      // const total = Math.round(((ask * value) + Number.EPSILON) * 100) / 100; i dont know...
    });
  }
  return total.toFixed(2);
}

const TopBar = () => {
  const user = useSelector((state) => state.user);
  const wallet = useSelector((state) => state.wallet);

  const { email } = user;
  return (
    <div className="top-bar">
      <h1>Wallet</h1>
      <div className="top-bar-info">
        <p data-testid="email-field">
          Email:
          {' '}
          {email}
        </p>
        <p
          data-testid="total-field"
        >
          Despesa Total: R$
          {' '}
          { totalFieldCalculation(wallet) }
          {' '}
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </p>
      </div>
    </div>
  );
};

export default TopBar;
