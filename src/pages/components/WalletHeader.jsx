import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends React.Component {
  constructor(props) {
    super(props);
    this.totalExpense = this.totalExpense.bind(this);
  }

  totalExpense() {
    const { expenses } = this.props;
    return expenses.map((expense) => {
      const { currency, value, exchangeRates } = expense;
      const askValue = exchangeRates[currency].ask;
      const totalExpense = Number(value) * Number(askValue);
      return totalExpense;
    })
      .reduce((a, b) => a + b, 0);
  }

  render() {
    const { email } = this.props;
    const totalValue = (Math.round(this.totalExpense() * 100) / 100).toFixed(2);
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ totalValue }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(WalletHeader);
