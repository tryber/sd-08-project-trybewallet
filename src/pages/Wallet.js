import React from 'react';
import WalletHeader from '../components/WalletHeader';
import WalletExpenseIncluder from '../components/WalletExpenseIncluder';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <WalletHeader />
        <WalletExpenseIncluder />
      </>
    );
  }
}

export default Wallet;
