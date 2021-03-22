import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import walletGif from '../assets/wallet.gif';

import styles from '../styles/components/Header.module.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.getTotal = this.getTotal.bind(this);
  }

  getTotal() {
    const { expenses } = this.props;
    return expenses.reduce((total, { currency, exchangeRates, value }) => {
      const currencyData = exchangeRates[currency];
      const convertedValue = +currencyData.ask * +value;
      return total + convertedValue;
    }, 0);
  }

  renderInfos() {
    const { email } = this.props;
    const total = this.getTotal();
    return (
      <dl className={ styles.headerInfos }>
        <div className={ styles.headerInfosItem }>
          <dt>Email:</dt>
          <dd data-testid="email-field">{ email }</dd>
        </div>
        <div className={ styles.headerInfosItem }>
          <dt>Despesa total:</dt>
          <dd data-testid="total-field">{ Math.round(total * 100) / 100 }</dd>
        </div>
        <div className={ styles.headerInfosItem }>
          <dt>Câmbio:</dt>
          <dd data-testid="header-currency-field">BRL</dd>
        </div>
      </dl>
    );
  }

  render() {
    return (
      <header className={ styles.header }>
        <img className={ styles.icon } src={ walletGif } alt="Wallet Gif" />
        { this.renderInfos() }
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
