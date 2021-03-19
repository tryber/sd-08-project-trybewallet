import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses(expenses) {
    return expenses.reduce((acc, currValue) => acc
     + parseFloat(currValue.value)
     * parseFloat(currValue.exchangeRates[currValue.currency].ask), 0);
  }

  render() {
    const { email, expenses } = this.props;

    return (
      <div className="walletPanelHeader">
        <h1>Trybe Wallet</h1>
        <div>
          <h1 data-testid="email-field">{ email }</h1>
          <h3 data-testid="header-currency-field">
            BRL
            {' '}
            <span data-testid="total-field">
              R$:
              { this.sumExpenses(expenses).toFixed(2) }
            </span>
          </h3>
        </div>
      </div>

    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  exchange: state.wallet.exchange,
});

export default connect(mapStateToProps)(Header);
