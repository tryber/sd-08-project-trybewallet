import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <ExpenseForm />
      </section>
    );
  }
}

export default Wallet;
