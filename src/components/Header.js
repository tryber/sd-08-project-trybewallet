import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props; // E-mail e despesas vindas do State
    const value = expenses // Constante com todos os valores gastos
      .reduce((acc, cur) => (acc + (Number(cur.value)
       * Number(cur.exchangeRates[cur.currency].ask))),
      0);
    return (
      <header>
        <h1> Wallet</h1>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{value}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
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
