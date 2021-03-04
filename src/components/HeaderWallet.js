import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import expenseType from '../types';

class HeaderWallet extends React.Component {
  total() {
    const { expenses } = this.props;
    return expenses
      .map(({ currency, value, exchangeRates }) => {
        const curr = exchangeRates[currency];
        const total = Number(value) * Number(curr.ask);
        return total;
      })
      .reduce((acc, expense) => acc + expense, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{this.total()}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(expenseType).isRequired,
};

export default connect(mapStateToProps)(HeaderWallet);
