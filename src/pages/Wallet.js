import React from 'react';

import Header from '../components/Header';
import ExpensesForm from '../components/ExpensesForm';
import AddExpenseForm from '../components/AddExpenseForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <AddExpenseForm />
        <ExpensesForm />
      </>
    );
  }
}

export default Wallet;
