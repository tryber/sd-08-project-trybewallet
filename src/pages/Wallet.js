import React from 'react';

import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';
import ExpensesHeader from '../components/ExpensesHeader';

import '../Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-page-container">
        <div className="wallet-container">
          <ExpensesHeader />
          <main>
            <ExpensesForm />
            <ExpensesTable />
          </main>
        </div>
      </div>
    );
  }
}

export default Wallet;
