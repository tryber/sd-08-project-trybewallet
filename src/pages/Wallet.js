import React from 'react';
import EditForm from '../components/EditForm';

import ExpenseForm from '../components/ExpenseForm';
import ExpensesList from '../components/ExpensesList';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();
    this.enterEditMode = this.enterEditMode.bind(this);
    this.editCompleted = this.editCompleted.bind(this);
    this.state = {
      isEditing: false,
      editExpense: {},
    };
  }

  enterEditMode(expense) {
    this.setState({
      isEditing: true,
      editExpense: expense,
    });
  }

  editCompleted() {
    this.setState({
      isEditing: false,
      editExpense: {},
    });
  }

  render() {
    const { isEditing, editExpense } = this.state;
    return (
      <main>
        <Header />
        {!isEditing
          ? <ExpenseForm />
          : <EditForm expense={ editExpense } editCompleted={ this.editCompleted } />}
        <ExpensesList edit={ this.enterEditMode } />
      </main>
    );
  }
}

export default Wallet;
