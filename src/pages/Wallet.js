import React from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
        <WalletTable />
      </div>
    );
  }
}

export default Wallet;
