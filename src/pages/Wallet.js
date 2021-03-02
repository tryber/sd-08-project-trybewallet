import React from 'react';
import WalletHeader from '../components/WalletHeader';
import formAddDespesa from '../components/FormAddDespesa';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <WalletHeader />
        <formAddDespesa />
      </main>
    );
  }
}

export default Wallet;
