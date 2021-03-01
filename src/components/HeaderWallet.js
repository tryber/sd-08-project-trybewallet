import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormExpenses from './FormExpenses';
import './HeaderWallet.css';
import logo from '../svg/045-wallet.svg';

class HeaderWallet extends Component {
  constructor(props) {
    super(props);
    this.totalValue = this.totalValue.bind(this);
    this.reduceValue = this.reduceValue.bind(this);
    this.getHistoricCurrency = this.getHistoricCurrency.bind(this);
  }

  getHistoricCurrency(exchangeRates, currency) {
    return Object.values(exchangeRates).reduce((acc, e) => {
      if (e.code === currency && e.codein !== 'BRLT') {
        return e;
      }
      return acc;
    }, {});
  }

  reduceValue(expenses) {
    return expenses.reduce((acc, { value, exchangeRates, currency }) => {
      const historicCurrency = this.getHistoricCurrency(exchangeRates, currency);
      const { ask } = historicCurrency;
      return ((acc * 1) + (value * 1) * (ask * 1));
    }, 0);
  }

  totalValue() {
    const { expenses } = this.props;
    return this.reduceValue(expenses).toFixed(2);
  }

  render() {
    const { userEmail } = this.props;
    return (
      <header className="header-wallet">
        <div className="header-box">
          <div><img src={ logo } alt="Wallet Logo" /></div>
          <div>
            <span data-testid="email-field">{userEmail}</span>
            <span data-testid="total-field" className="header-toral">
              {this.totalValue()}
              <span
                data-testid="header-currency-field"
                className="header-currency"
              >
                BRL
              </span>
            </span>
          </div>
        </div>
        <FormExpenses />
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.user.email,
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(HeaderWallet);

HeaderWallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape(PropTypes.shape({
      ask: PropTypes.string.isRequired,
      bid: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      codein: PropTypes.string.isRequired,
      create_date: PropTypes.string.isRequired,
      high: PropTypes.string.isRequired,
      low: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      pctChange: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      varBid: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  }).isRequired).isRequired,
};
