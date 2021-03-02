import React from 'react';

import Header from '../components/Header';
import ExpensesInput from '../components/ExpensesInput';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ExpensesInput />
      </>
    );
  }
}

export default Wallet;
