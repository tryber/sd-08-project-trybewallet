import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

import WalletHeader from '../components/WalletHeader';
import FormExpense from '../components/FormExpense';

function Wallet() {
  // const wallet = useSelector((state) => state.wallet);
  return (
    <main>
      <WalletHeader />
      <FormExpense />
    </main>
  );
}

export default Wallet;
