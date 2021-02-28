import React from 'react';
import { useSelector } from 'react-redux';
import WalletHeader from '../components/WalletHeader';
import FormExpense from '../components/FormExpense';
import WalletTable from '../components/WalletTable';
import FormExpenseEdit from '../components/FormExpenseEdit';

function Wallet() {
  const globalEditMode = useSelector((state) => state.wallet.editmode);

  return (
    <div>
      <WalletHeader />
      {!globalEditMode && <FormExpense />}
      {!globalEditMode && <WalletTable />}
      {globalEditMode && <FormExpenseEdit />}
    </div>
  );
}

export default Wallet;
