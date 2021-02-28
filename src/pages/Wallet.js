import React from 'react';
import Header from '../components/Header';
import Expense from '../components/Expense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expense />
      </div>
    );
  }
}

export default Wallet;
