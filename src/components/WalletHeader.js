import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends React.Component {
  constructor() {
    super();

    this.getTotalExpenses = this.getTotalExpenses.bind(this);
  }

  getTotalExpenses() {
    const { expenses } = this.props;
    const totalExpenses = expenses.reduce((total, each) => {
      const { value, currency, exchangeRates } = each;
      const rate = parseFloat(exchangeRates[currency].ask);
      return total + parseFloat(value) * rate;
    }, 0);
    return totalExpenses.toFixed(2);
  }

  render() {
    const { loggedUserEmail } = this.props;
    return (
      <header>
        Trybe Wallet
        <p data-testid="email-field">{ loggedUserEmail }</p>
        <p data-testid="total-field">{`Total: R$ ${this.getTotalExpenses()}`}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedUserEmail: state.user.email,
  expenses: state.wallet.expenses,
});

WalletHeader.propTypes = {
  loggedUserEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(WalletHeader);
