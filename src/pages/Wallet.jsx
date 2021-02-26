import React from 'react';

import WalletHeader from '../components/WalletHeader';
import FormExpense from '../components/FormExpense';
import WalletTable from '../components/WalletTable';

function Wallet() {
  return (
    <main>
      <WalletHeader />
      <FormExpense />
      <WalletTable />
    </main>
  );
}

export default Wallet;
