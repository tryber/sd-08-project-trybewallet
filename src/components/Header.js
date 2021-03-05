import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  handleExpenses() {
    const { expenses } = this.props;
    return expenses.reduce((acc, cur) => {
      const value = parseFloat(cur.value);
      const rate = parseFloat(cur.exchangeRates[cur.currency].ask);
      return acc + (value * rate);
    }, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ this.handleExpenses() }</span>
        <span data-testid="header-currency-field">BRL</span>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
