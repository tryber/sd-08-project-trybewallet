import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, expensesValue } = this.props;
    console.log(expensesValue);
    return (
      <header>
        <div data-testid="email-field">{userEmail}</div>
        <div data-testid="total-field">
          {
            expensesValue.length <= 0
              ? 0
              : expensesValue
                .reduce((acc, curr) => acc
                + curr.value * (+curr.exchangeRates[curr.currency].ask), 0)
                .toFixed(2)
          }
        </div>
        <div data-testid="header-currency-field">BRL</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expensesValue: state.wallet.expenses,
});

// const mapDispatchToProps = {

// }

Header.propTypes = {
  userEmail: PropTypes.string,
  expensesValue: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
