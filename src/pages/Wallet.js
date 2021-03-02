import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpensesForm from '../components/ExpensesForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { receivedEmail, expenses } = this.props;

    return (
      <div>
        <header>
          <div data-testid="email-field">
            { receivedEmail }
          </div>
          <span data-testid="total-field">
            {expenses.reduce((acc, curr) => {
              const multiplyBy = curr.exchangeRates[curr.currency].ask;
              const expense = Number(multiplyBy * curr.value);
              return acc + Number(expense);
            }, 0).toFixed(2)}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <ExpensesForm />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  receivedEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  receivedEmail: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
