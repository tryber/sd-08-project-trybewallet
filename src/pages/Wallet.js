import React from 'react';
import WalletHeader from '../components/WalletHeader';
import AddExpenseForm from '../components/AddExpenseForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <div>TrybeWallet</div>
        <AddExpenseForm />
        <WalletHeader />
      </>
    );
  }
}

export default Wallet;
