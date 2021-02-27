import React from 'react';

import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';
import WalletHeader from '../components/WalletHeader';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <WalletHeader />
        <main>
          <ExpensesTable />
          <ExpensesForm />
        </main>
      </>
    );
  }
}

export default Wallet;
