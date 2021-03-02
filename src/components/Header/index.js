import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Header.css';

class Header extends React.Component {
  getTotal() {
    const { expenses } = this.props;
    console.log(expenses);
    // if (!expenses.length) return 0;
    return expenses.map(({ currency, value, exchangeRates }) => {
      const currencyData = exchangeRates[currency];
      const total = Number(value) * Number(currencyData.ask);
      return total;
    }).reduce((acc, expense) => acc + expense, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header-content-wallet">
        <div className="email-content-wallet">
          <span
            className="email-wallet"
            data-testid="email-field"
          >
            {`E-mail: ${email}`}
          </span>
        </div>
        <div className="total-field-content-wallet">
          <dt>Total</dt>
          <dd data-testid="total-field">
            R$
            {' '}
            { (Math.round(this.getTotal() * 100) / 100).toFixed(2) }
          </dd>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet: { expenses } }) => ({
  email: user.email,
  expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default connect(mapStateToProps, null)(Header);
