import React from 'react';
import WalletHeader from '../components/WalletHeader';
import WalletExpenseIncluder from '../components/WalletExpenseIncluder';
import WalletExpenseTable from '../components/WalletExpenseTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <WalletHeader />
        <WalletExpenseIncluder />
        <WalletExpenseTable />
      </>
    );
  }
}

export default Wallet;
