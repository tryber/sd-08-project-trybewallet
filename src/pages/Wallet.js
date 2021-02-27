import React from 'react';

import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';
import ExpensesHeader from '../components/ExpensesHeader';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <ExpensesHeader />
        <main>
          <ExpensesTable />
          <ExpensesForm />
        </main>
      </>
    );
  }
}

export default Wallet;
