import React from 'react';
import WalletHeader from '../components/WalletHeader';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpensesTable from '../components/expenses-table/ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <WalletHeader />
        <AddExpenseForm />
        <ExpensesTable />
      </>
    );
  }
}

export default Wallet;
