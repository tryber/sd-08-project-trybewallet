import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { userCurrenciesAction, userExpensesAction } from '../actions';

class WalletHeader extends React.Component {
  getTotal() {
    const { expenses } = this.props;
    return expenses.map(({ currency, value, exchangeRates }) => {
      const currencyData = exchangeRates[currency];
      const total = Number(value) * Number(currencyData.ask);
      return total;
    })
      .reduce((acc, expense) => acc + expense, 0);
  }

  render() {
    const { email } = this.props;
    console.log(this.getTotal());
    return (
      <>
        <header data-testid="email-field">{email}</header>
        <div data-testid="total-field">
          R$
          {' '}
          {Math.round(this.getTotal() * 100) / 100}
        </div>
        <div data-testid="header-currency-field">BRL</div>
      </>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(WalletHeader);

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
