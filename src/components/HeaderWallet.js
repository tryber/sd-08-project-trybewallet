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
  }

  totalValue() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, current) => acc * 1 + current.value * 1, 0);
    return total;
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
    exchangeRates: PropTypes.arrayOf(PropTypes.shape({
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
