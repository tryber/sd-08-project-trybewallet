import React, { Component } from 'react';

import Header from '../components/header';
import ExpenseForm from '../components/expenseForm';

class Wallet extends Component {
  render() {
    return (
      <>
        <Header />
        <ExpenseForm />
      </>
    );
  }
}

export default Wallet;
