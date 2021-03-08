import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HeaderWallet extends Component {
  render() {
    const { email, expenses } = this.props;
    console.log(expenses);
    const total = expenses.reduce(
      (acc, expense) => (
        acc + (expense.value
        * expense.exchangeRates[expense.currency].ask)
      ), 0,
    );

    return (
      <div>
        <p data-testid="email-field">
          {email}
        </p>
        <p data-testid="total-field">{ total }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ user: { email }, wallet }) => ({
  email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(HeaderWallet);
