import React from 'react';
import ExpensesList from './component/ExpensesList';
import Form from './component/Form';
import Header from './component/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Form />
        <ExpensesList />
      </>
    );
  }
}

export default Wallet;
