import React from 'react';
import Header from '../components/Header';
import Expense from '../components/Expense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expense />
        TrybeWallet
      </div>
    );
  }
}

export default Wallet;
