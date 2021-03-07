import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './HeaderWallet.css';

class HearderWallet extends Component {
  total() {
    const { expenses } = this.props;
    return expenses.map(({ currency, value, exchangeRates }) => {
      const currencyData = exchangeRates[currency];
      const total = Number(value) * Number(currencyData.ask);
      return total;
    })
      .reduce((acc, actual) => acc + actual, 0);
  }

  render() {
    const { email } = this.props;
    console.log();
    return (
      <div className="limiter-header-wallet">
        <div className="container-header-wallet container-header-wallet-bg">
          <div className="wrap-header-wallet">
            <span className="header-wallet-logo" />
            <span
              data-testid="total-field"
              className="header-wallet-title-right "
            >
              Despesas Totais: R$
              {(Math.round(this.total() * 100) / 100).toFixed(2)}
              {' '}
              <span data-testid="header-currency-field">BRL</span>
              {' '}
            </span>
            <span
              data-testid="email-field"
              className="header-wallet-title-left"
            >
              {email}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  user: { email },
  wallet: { currencies, expenses },
}) => ({
  email,
  currencies,
  expenses,
});

export default connect(mapStateToProps, null)(HearderWallet);
HearderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};
