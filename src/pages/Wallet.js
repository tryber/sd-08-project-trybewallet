import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';
import ExpenseTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ExpenseForm />
        <ExpenseTable />
      </>
    );
  }
}

export default Wallet;
