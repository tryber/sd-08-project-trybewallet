import React from 'react';
import Header from '../actions/components/Header';
import Form from '../actions/components/Form';
import ExpenseTable from '../actions/components/ExpenseTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Form />
        <ExpenseTable />
      </>
    );
  }
}

export default Wallet;
