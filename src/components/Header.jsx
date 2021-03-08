import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumTotal() {
    const { expenses } = this.props;
    const sumTotal = expenses.map(
      ({ currency, value, exchangeRates }) => {
        const selectedCurrency = exchangeRates[currency];
        const total = Number(selectedCurrency.ask) * Number(value);
        return total;
      },
    );
    const total = sumTotal.reduce((acc, crr) => acc + crr, 0);
    return Math.round((total * 100)) / 100;
  }

  render() {
    const { userEmail } = this.props;
    const totalValue = this.sumTotal();
    return (
      <header>
        <span data-testid="email-field">{userEmail}</span>
        <span data-testid="total-field">{ totalValue }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
