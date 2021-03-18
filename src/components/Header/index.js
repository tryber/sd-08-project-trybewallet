import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <span data-testid="email-field">{`Email: ${email}`}</span>
        <span data-testid="total-field">
          Despesa Total:
          {expenses.length === 0 ? 0
            : expenses.reduce((total, expense) => total + (
              expense.value * expense.exchangeRates[expense.currency].ask
            ), 0).toFixed(2)}
          {/* Peguei a dica no repositório do Vítor Cançado https://github.com/tryber/sd-08-project-trybewallet/pull/141/files */}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
