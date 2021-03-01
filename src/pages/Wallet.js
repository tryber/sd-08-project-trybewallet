import React from 'react';
import WalletHeader from '../components/WalletHeader';
import Forms from '../components/Forms';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <WalletHeader />
        <Forms />
        <ExpensesTable />
      </main>
    );
  }
}

export default Wallet;
