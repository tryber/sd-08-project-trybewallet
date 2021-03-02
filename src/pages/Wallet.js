import React from 'react';
import WalletHeader from '../components/WalletHeader';
import FormAddDespesa from '../components/FormAddDespesa';

class Wallet extends React.Component {
  render() {
    return (
      <main className="wallwt ">
        <WalletHeader />
        <FormAddDespesa />
      </main>
    );
  }
}

export default Wallet;
