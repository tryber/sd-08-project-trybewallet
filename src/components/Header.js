import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Select } from '../components/index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  getTotal() {
    const { expenses } = this.props;
    return expenses
      .map(({ currency, value, exchangeRates }) => {
        const currencyData = exchangeRates[currency];
        const total = Number(value) * Number(currencyData.ask);
        return total;
      })
      .reduce((acc, expense) => acc + expense, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          { `Email: ${email}`}
        </span>
        <span data-testid="total-field">
          R$
          { (Math.round(this.getTotal() * 100) / 100).toFixed(2) }
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};
