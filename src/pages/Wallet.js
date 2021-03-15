import React from 'react';
import Header from '../components/Header';
import Forms from '../components/Forms';
import Expenses from '../components/Expenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p />
        <Forms />
        <Expenses />
      </div>
    );
  }
}

export default Wallet;
