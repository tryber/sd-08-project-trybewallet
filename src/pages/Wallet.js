import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import WalletForm from '../components/WalletForm';

function Wallet() {
  const store = useSelector((state) => state);
  const { user, wallet } = store;

  const calculateTotal = () => (wallet.expenses.length < 1 ? 0 : wallet.expenses.reduce(
    (acc, { value, exchangeRates, currency }) => acc
        + (parseFloat(value) * exchangeRates[currency].ask), 0,
  ).toFixed(2));

  if (user.isLoggedIn === false) return <Redirect to="/" />;
  return (
    <>
      <header>
        <p data-testid="email-field">{`Email: ${user.email}`}</p>
        <p data-testid="total-field">{`Despesa total: R$ ${calculateTotal()}`}</p>
        <p data-testid="header-currency-field">Moeda: BRL</p>
      </header>
      <main>
        <WalletForm />
      </main>
    </>);
}

export default Wallet;
