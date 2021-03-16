import React from 'react';

import WalletHeader from '../components/WalletHeader';
import FormExpense from '../components/FormExpense';
import WalletTable from '../components/WalletTable';

function Wallet() {
  return (
    <div>
      <WalletHeader />
      <FormExpense />
      <WalletTable />
    </div>
  );
}

export default Wallet;
