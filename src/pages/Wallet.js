import React from 'react';
import { useSelector } from 'react-redux';

export default function Wallet() {
  const user = useSelector((state) => state.user);
  const wallet = useSelector((state) => state.wallet);
  return (
    <div className="container">
      <div data-testid="email-field">{user.email}</div>
      <div data-testid="total-field">{wallet.expenses || 0}</div>
      <div data-testid="header-currency-field">{wallet.currencies || 'BRL'}</div>
    </div>
  );
}
