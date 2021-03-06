import React from 'react';
import Header from '../componet/Header';
import TableExpenses from '../componet/TableExpenses';
import FormExpenses from '../componet/FormExpenses';

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
