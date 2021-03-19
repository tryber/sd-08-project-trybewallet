import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  constructor() {
    super();

    this.updateForm = this.updateForm.bind(this);

    this.state = {
      id: undefined,
    };
  }

  updateForm(id) {
    this.setState({
      id,
    });
  }

  render() {
    const { id } = this.state;
    return (
      <div>
        <Header />
        <ExpenseForm id={ id } callback={ this.updateForm } />
        <ExpensesTable callback={ this.updateForm } />
      </div>
    );
  }
}

export default connect(null, null)(Wallet);
