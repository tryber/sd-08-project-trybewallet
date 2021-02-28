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
          <ExpensesForm />
          <ExpensesTable />
        </main>
      </>
    );
  }
}

export default Wallet;
