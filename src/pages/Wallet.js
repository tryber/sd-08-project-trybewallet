import React from 'react';
import Header from '../components/wallet/Header';
import Expenses from '../components/wallet/Expenses';
import Table from '../components/wallet/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div className="entireScreen">
        <Header />
        <Expenses />
        <Table />
      </div>
    );
  }
}

export default Wallet;
