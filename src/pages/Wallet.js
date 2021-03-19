import React from 'react';
import HeaderWallet from '../components/HeaderWallet';
import FormAddExpense from '../components/FormAddExpense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <HeaderWallet />
        <FormAddExpense />
      </div>
    );
  }
}

export default Wallet;
