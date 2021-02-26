import React from 'react';
import Header from '../components/WalletHeader';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ExpenseForm />
        <ExpenseList />
      </>
    );
  }
}

export default Wallet;
