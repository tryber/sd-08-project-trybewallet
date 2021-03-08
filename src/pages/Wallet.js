import React from 'react';
import HeaderWallet from '../components/HeaderWallet';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <HeaderWallet />
        <WalletForm />
      </>
    );
  }
}

export default Wallet;
