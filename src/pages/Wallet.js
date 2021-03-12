import React from 'react';
import { WalletHeader, ExpenseForm } from '../components';
// import ExpenseForm from '../components/ExpenseForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <WalletHeader />
        <ExpenseForm />
      </>
    );
  }
}

export default Wallet;
