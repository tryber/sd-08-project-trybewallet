import React from 'react';
import Header from '../components/Header';
import Expense from '../components/Expense';
import Table from '../components/Table';

import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet">
        <Header />
        <Expense />
        <Table />
      </div>
    );
  }
}

export default Wallet;
