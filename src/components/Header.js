import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  expensesCalculator() {
    const { expenses } = this.props;
    const totalExpenses = expenses.reduce((total, { value, currency, exchangeRates }) => {
      const toBRL = exchangeRates[currency].ask;
      return total + (value * toBRL);
    }, 0);
    return Math.round(totalExpenses * 100) / 100;
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{`Email logado ${email}`}</h3>
        <p>
          {'Despesas Totais: '}
          <span data-testid="total-field">
            {this.expensesCalculator()}
          </span>
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default connect(mapStateToProps)(Header);
