import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <ExpenseForm />
        <WalletTable />
      </section>
    );
  }
}

export default Wallet;
