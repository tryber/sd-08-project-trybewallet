import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import expenseType from '../types';

import styles from '../styles/components/Header.module.css';

class Header extends Component {
  getTotalAmount() {
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
      <header className={ styles.header }>
        <dl className={ styles.headerInfosContainer }>
          <div className={ styles.headerInfo }>
            <dt>Email</dt>
            <dd data-testid="email-field">{ email }</dd>
          </div>
          <div className={ styles.headerInfo }>
            <dt>Total</dt>
            <dd data-testid="total-field">
              RS
              { parseFloat(this.getTotalAmount()).toFixed(2) }
            </dd>
          </div>
          <div className={ styles.headerInfo }>
            <dt>Câmbio</dt>
            <dd data-testid="header-currency-field">BRL</dd>
          </div>
        </dl>
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

// https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/dl
// Definition List  <dl> seguidos de <dd> dica PSimoes
