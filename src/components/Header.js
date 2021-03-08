import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, current) => {
      const value = parseInt(current.value, 10);
      const exRate = parseFloat(current.exchangeRates[current.currency].ask);
      return acc + (exRate * value);
    }, 0);
    return (
      <header>
        <h2>Trybe</h2>
        <span data-testid="email-field">{ email }</span>
        <div>
          <span data-testid="total-field">{ total.toFixed(2) }</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
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
