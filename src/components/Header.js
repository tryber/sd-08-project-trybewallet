import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
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
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{`Seu email: ${email}`}</p>
        <span data-testid="total-field">{this.totalExpenses}</span>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
