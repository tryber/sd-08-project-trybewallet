import React from 'react';
import ExpenseForm from '../components/wallet/ExpenseForm';
import ExpenseTable from '../components/wallet/ExpenseTable';
import Header from '../components/wallet/Header';

function Wallet() {
  return (
    <div>
      <Header />
      <hr />
      <ExpenseForm />
      <hr />
      <ExpenseTable />
    </div>
  );
}

export default Wallet;
