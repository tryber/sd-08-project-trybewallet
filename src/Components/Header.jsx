import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/header.css';

class Header extends React.Component {
  calculateExpenses(expenses) {
    if (expenses.length === 0) {
      return 0;
    }
    const total = expenses.reduce((acc, expense) => {
      const { value, currency, exchangeRates } = expense;
      const currencyValue = exchangeRates[currency].ask;
      return acc + currencyValue * value;
    }, 0);
    return total;
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <h1>Trybe Wallet</h1>
        <section>
          <span data-testid="email-field">{email}</span>
          <span data-testid="total-field">
            {parseFloat(this.calculateExpenses(expenses)).toFixed(2)}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.totalExpense,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      currency: PropTypes.string,
      exchangeRates: PropTypes.shape(PropTypes.object),
    }),
  ).isRequired,
};
