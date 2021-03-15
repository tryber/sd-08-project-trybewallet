import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        TrybeWallet
        <Header />
        <ExpenseForm />
        <ExpenseTable />
      </div>
    );
  }
}

export default Wallet;
