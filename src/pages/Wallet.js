import React from 'react';
import WalletHeader from '../components/WalletHeader';
import AddExpenseForm from '../components/AddExpenseForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <WalletHeader />
        <AddExpenseForm />
      </>
    );
  }
}

export default Wallet;
