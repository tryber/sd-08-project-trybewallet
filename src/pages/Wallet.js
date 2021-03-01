import React from 'react';
import Header from '../components/Header';
import Expense from '../components/Expense';
import Expenses from '../components/Expenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expense />
        <Expenses />
      </div>
    );
  }
}

export default Wallet;
