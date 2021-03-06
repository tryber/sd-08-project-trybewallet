import React from 'react';
import { useSelector } from 'react-redux';

function WalletHeader() {
  const email = useSelector((state) => state.user.email);
  const wallet = useSelector((state) => state.wallet);
  function calcDespTotal() {
    return wallet.expenses.reduce((acc, cur) => {
      const { ask } = cur.exchangeRates[cur.currency];
      const calc = Number(ask * cur.value) || null;
      return acc + Number(calc);
    }, 0).toFixed(2);
  }
  return (
    <header className="wallet-header" role="banner">
      <span data-testid="email-field">{`E-mail: ${email}`}</span>
      <br />
      <span>Despesa Total:</span>
      <span data-testid="total-field">{calcDespTotal() || 0}</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>

  );
}

// quando ficar pronto escrever assim{`Despesa Total: ${BRL}`}

export default WalletHeader;
