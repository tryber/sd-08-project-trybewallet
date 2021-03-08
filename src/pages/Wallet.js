import React from 'react';
import FormExpense from '../components/FormExpense';
import Header from '../components/Header';
import TabletExpense from '../components/TabletExpense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormExpense />
        <TabletExpense />
      </div>
    );
  }
}

export default Wallet;
