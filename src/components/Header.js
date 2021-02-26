import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/header.css';
import { connect } from 'react-redux';
import logo from '../assets/images/wallet.svg';

class Header extends Component {
  render() {
    let totalExpenses = 0;
    const { email, expenses } = this.props;
    const calcExpense = ({ value, currency, exchangeRates }) => {
      const result = parseInt(value, 10) * exchangeRates[currency].ask;
      return result;
    };

    if (expenses.length > 0) {
      totalExpenses = expenses.reduce(
        (acc, expense) => calcExpense(expense) + acc,
        0,
      );
    }
    return (
      <header>
        <img src={ logo } alt="Logo Wallet" />
        <span data-testid="email-field">{`Email: ${email}`}</span>
        <div>
          <span data-testid="total-field">{`Despesas: ${totalExpenses} `}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps, null)(Header);
