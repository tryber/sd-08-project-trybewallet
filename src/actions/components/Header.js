import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses() {
    const { expenses } = this.props;
    const summedExpenses = expenses.reduce(
      (acc, curr) => {
        const { value, exchangeRates, currency } = curr;
        acc += parseFloat((value * exchangeRates[currency].ask));
        return acc;
      }, 0,
    );
    return parseFloat(summedExpenses.toFixed(2));
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h2>Wallet</h2>
        <p data-testid="email-field">
          Email:
          { email }
        </p>
        <p data-testid="total-field">
          {`Despesas totais: ${this.sumExpenses()}`}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, null)(Header);
