import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import expenseType from '../types';

import walletImage from './images/wallet.png';

import './Header.css';

class Header extends Component {
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
      <header className="header">
        <div className="title-container">
          <h1>
            TrybeWallet
            <img src={ walletImage } alt="wallet" />
          </h1>
        </div>
        <div className="header-items">
          <span className="email" data-testid="email-field">{ email }</span>
          <div>
            <span data-testid="total-field">
              TOTAL: R$
              { (Math.round(this.getTotal() * 100) / 100).toFixed(2) }
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>

        </div>

      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(expenseType).isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
