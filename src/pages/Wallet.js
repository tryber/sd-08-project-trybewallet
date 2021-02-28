import React from 'react';
import Header from '../components/Header';
import TableExpenses from '../components/TableExpenses';
import FormExpenses from '../components/FormExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormExpenses />
        <TableExpenses />
      </div>);
  }
}

export default Wallet;
