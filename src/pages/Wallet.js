import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { WalletHeader, ExpenseForm, ExpenseTable } from '../components';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      total: 0,
      editing: { id: -1 },
    };

    this.calcTotal = this.calcTotal.bind(this);
    this.editRow = this.editRow.bind(this);
  }

  calcTotal(expenseToRemove) {
    const { expenses } = this.props;
    const filtredExpense = expenses
      .filter((expense) => parseInt(expense.id, 10) !== parseInt(expenseToRemove, 10));
    const newTotal = filtredExpense.reduce((acc, expense) => {
      const { currency, exchangeRates, value } = expense;
      const rate = parseFloat(exchangeRates[currency].ask);
      return acc + rate * parseFloat(value);
    }, 0);

    this.setState({
      total: newTotal,
    });
  }

  editRow(expense) {
    const expenseToEdit = expense || { id: -1 };
    this.setState({
      editing: expenseToEdit,
    });
  }

  render() {
    const { total, editing } = this.state;
    return (
      <>
        <WalletHeader total={ total } />
        <ExpenseForm
          calcTotal={ this.calcTotal }
          editRow={ this.editRow }
          editing={ editing }
        />
        <ExpenseTable calcTotal={ this.calcTotal } editRow={ this.editRow } />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(Wallet);
