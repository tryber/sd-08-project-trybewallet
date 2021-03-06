import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  getCurrencies() {
    const { expenses } = this.props;
    return expenses.map(({ exchangeRates, currency, value }) => {
      const currencyData = exchangeRates[currency];
      const total = Number(value) * Number(currencyData.ask);
      return total;
    })
      .reduce((acc, expense) => acc + expense, 0);
  }

  render() {
    const { email, expenses } = this.props;

    return (
      <div>

        <p data-testid="email-field">
          Email:
          {' '}
          {email}
        </p>
        <p data-testid="total-field">
          Despesa Total: R$
          {' '}
          {this.getCurrencies()}
          {' '}

        </p>
        <p data-testid="header-currency-field" />

      </div>);
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(Header);
