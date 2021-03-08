import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logotrybe from './images/logotrybe.jpg';

class Header extends React.Component {
  totalValue() {
    const { expenses } = this.props;
    const expensesMap = expenses.map(({ currency, value, exchangeRates }) => {
      const dayCurrency = exchangeRates[currency];
      const sumExpense = Number(value) * Number(dayCurrency.ask);
      return sumExpense;
    });
    return expensesMap.reduce((total, expense) => total + expense, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <header className="app-header">
        <img className="app-header__logo" src={ logotrybe } alt="logo da trybe" />
        <p className="app-header-email" data-testid="email-field">
          {email}
        </p>
        <pre className="app-header-valor" data-testid="total-field">
          {' '}
          Total R$
          {' '}
          {this.totalValue()}
          {' '}
        </pre>
        <pre
          data-testid="header-currency-field"
          className="app-header-cambio"
        >
          {' '}
          Câmbio BRL
        </pre>
      </header>);
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps)(Header);
