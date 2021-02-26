import React from 'react';
import './style.css';
import WalletHeader from './WalletHeader';
import WalletExpense from './WalletExpense';

class Wallet extends React.Component {
  render() {
    return (
      <div className="walletContainer">
        <WalletHeader />
        <WalletExpense />
        ...
      </div>
    );
  }
}

export default Wallet;
