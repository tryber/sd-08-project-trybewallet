import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  constructor() {
    super();

    this.getTotalExpenses = this.getTotalExpenses.bind(this);
  }

  getTotalExpenses() {
    const { expenses } = this.props;
    return expenses.length < 1 ? 0 : expenses.reduce(
      (acc, { value, exchangeRates, currency }) => acc
        + (parseFloat(value) * exchangeRates[currency].ask), 0,
    ).toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h1>Trybe Wallet</h1>
        <section data-testid="email-field">
          {`E-mail: ${email}`}
        </section>

        <span data-testid="total-field">
          {`Despesa Total: R$ ${this.getTotalExpenses()} `}
        </span>

        <span data-testid="header-currency-field">
          BRL
        </span>
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
  expenses: PropTypes.arrayOf(PropTypes.object),
};

WalletHeader.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, null)(WalletHeader);
