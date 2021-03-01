import React from 'react';
import Header from '../components/wallet/Header';
import Expenses from '../components/wallet/Expenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expenses />
      </div>
    );
  }
}

export default Wallet;
