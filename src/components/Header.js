import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  getTotal() {
    const { expenses } = this.props;
    return expenses.map(({ currency, value, exchangeRates }) => {
      const currencyData = exchangeRates[currency];
      const total = Number(value) * Number(currencyData.ask);
      return total;
    })
      .reduce((acc, curr) => acc + curr, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h1> Wallet</h1>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ this.getTotal() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
