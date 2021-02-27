import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ExpensesForm from '../components/ExpensesForm';

class Wallet extends React.Component {
  constructor() {
    super();

    this.getExpensesTotal = this.getExpensesTotal.bind(this);
  }

  getExpensesTotal() {
    const { expenses } = this.props;
    return expenses.length < 1 ? 0 : expenses.reduce(
      (acc, expense) => acc + parseFloat(expense.value), 0,
    );
  }

  render() {
    const { email } = this.props;
    console.log(this.getExpensesTotal());
    return (
      <section>
        <h4 data-testid="email-field">{ email }</h4>
        <table>
          <thead>
            <tr>
              <th>Total de Gastos</th>
              <th>Câmbio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-testid="total-field">{ this.getExpensesTotal() }</td>
              <td data-testid="header-currency-field">BRL</td>
            </tr>
          </tbody>
        </table>
        <ExpensesForm />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Wallet);
