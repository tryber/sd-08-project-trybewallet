import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.calculateTotalExpenses = this.calculateTotalExpenses.bind(this);
  }

  calculateTotalExpenses() {
    const { expenses } = this.props;
    if (expenses === []) return 0;
    const total = expenses.reduce((acc, curr) => (acc + curr.convertedValue), 0);
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header className="wallet-header">
        <span><h2>Trybe Wallet</h2></span>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ this.calculateTotalExpenses()}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape([]).isRequired,
};

function mapStateToProps(state) {
  return ({
    email: state.user.email,
    expenses: state.wallet.expenses,
  });
}

export default connect(mapStateToProps)(Header);
