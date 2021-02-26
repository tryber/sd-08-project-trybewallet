import React from 'react';
import Header from '../components/Header';
import Expense from '../components/Expense';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expense />
        <Table />
        TrybeWallet
      </div>
    );
  }
}

export default Wallet;
