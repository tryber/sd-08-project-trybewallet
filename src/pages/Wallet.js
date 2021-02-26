import React from 'react';

import Header from '../components/Header';
import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpensesForm />
        <ExpensesTable />
      </div>
    );
  }
}

export default Wallet;
