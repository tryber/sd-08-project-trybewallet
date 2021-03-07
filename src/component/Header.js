import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import expenseType from '../types';

class Header extends React.Component {
  getTotal() {
    const { expenses } = this.props;
    return expenses
      .map(({ currency, value, exchangeRates }) => {
        const currencyData = exchangeRates[currency];
        const total = Number(value) * Number(currencyData.ask);
        return total;
      }).reduce((acc, expense) => acc + expense, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <dl>
          <dt>Email</dt>
          <dd data-testid="email-field">{ email }</dd>
          <dt>
            R$
          </dt>
          <dd data-testid="total-field">
            R$0
            { (Math.round(this.getTotal() * 100) / 100).toFixed(2)}
          </dd>
          <dt>Câmbio</dt>
          <dd data-testid="header-currency-field">BRL</dd>
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
