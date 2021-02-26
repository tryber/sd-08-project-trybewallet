import React from 'react';

import ExpenseForm from '../components/ExpenseForm';
import ExpensesList from '../components/ExpensesList';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <ExpenseForm />
        <ExpensesList />
      </main>
    );
  }
}

export default Wallet;
