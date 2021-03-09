import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Form />
        <TableExpenses />
      </>
    );
  }
}

export default Wallet;
