import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  handleTotalExpenses() {
    const { expenses } = this.props;

    return expenses.reduce((accumulator, expense) => (
      accumulator + (parseInt(expense.value, 10)
        * expense.exchangeRates[expense.currency].ask)
    ), 0);
  }

  render() {
    const { email } = this.props;

    return (
      <>
        <p data-testid="email-field">{email}</p>

        <span data-testid="total-field">{this.handleTotalExpenses().toFixed(2)}</span>
        <span data-testid="header-currency-field">BRL</span>
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

export default connect(mapStateToProps, null)(Header);
