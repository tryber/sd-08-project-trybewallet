import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  sumValue() {
    const { expenses } = this.props;
    const expensesMap = expenses.map(({ currency, value, exchangeRates }) => {
      const dayCurrency = exchangeRates[currency];
      const sumExpense = Number(value) * Number(dayCurrency.ask);
      return sumExpense;
    });
    return expensesMap.reduce((total, expense) => total + expense, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          {email}
        </p>
        <span>Total: R$</span>
        <span data-testid="total-field">
          {this.sumValue()}
        </span>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps)(Header);
