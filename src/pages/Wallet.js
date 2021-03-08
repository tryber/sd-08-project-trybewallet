import React from 'react';
import HeaderWallet from '../components/HeaderWallet';
import TableExpense from '../components/TableExpense';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <HeaderWallet />
        <WalletForm />
        <TableExpense />
      </>
    );
  }
}

export default Wallet;
