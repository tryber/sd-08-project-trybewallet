import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

  render() {
    const { email } = this.props;
    const total = this.getTotal();
    return (
      <header className={ styles.header }>
        <dl className={ styles.headerInfos }>
          <div className={ styles.headerInfosItem }>
            <dt>Email:</dt>
            <dd data-testid="email-field">{ email }</dd>
          </div>
          <div className={ styles.headerInfosItem }>
            <dt>Despesa total:</dt>
            <dd data-testid="total-field">{ total }</dd>
          </div>
          <div className={ styles.headerInfosItem }>
            <dt>Câmbio:</dt>
            <dd data-testid="header-currency-field">BRL</dd>
          </div>
        </dl>
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
