import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalExpense(expense) {
    const show = expense.reduce((acc, curr) => {
      const currence = Array.from(curr.exchangeRates)
        .find((item) => item.name === curr.selectedCoin);
      if (currence) {
        return acc + (curr.expenseAmount * currence.ask);
      }
      return acc;
    }, 0);

    return Number(show).toFixed(2);
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <>
        <h1>
          Header
        </h1>
        <h3 data-testid="email-field">{ email }</h3>
        <h3>
          Dispesa Total:
          {' '}
          <span data-testid="total-field">{this.totalExpense(expenses)}</span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </h3>
      </>

    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
