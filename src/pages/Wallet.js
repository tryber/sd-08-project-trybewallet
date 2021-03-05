import React from 'react';
import WalletHeader from '../components/WalletHeader';
import WalletExpenseForm from '../components/WalletExpenseForm';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <WalletHeader />
        <WalletExpenseForm />
        <WalletTable />
      </div>
    );
  }
}

export default Wallet;
