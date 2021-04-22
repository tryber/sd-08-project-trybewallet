import React from 'react';
import ExpenseForm from '../components/wallet/ExpenseForm';
import Header from '../components/wallet/Header';

function Wallet() {
  return (
    <div>
      <Header />
      <hr />
      <ExpenseForm />
    </div>
  );
}

export default Wallet;
