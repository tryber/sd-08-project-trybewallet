import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);

    this.despesaTotal = this.despesaTotal.bind(this);
  }

  despesaTotal() {
    const { wallet } = this.props;
    const { expenses } = wallet;
    if (expenses !== []) {
      const total = expenses
        .map((expense) => parseFloat(
          expense.value * expense.exchangeRates[expense.currency].ask,
        )
          .toFixed(2))
        .reduce((soma, expenseValue) => soma + expenseValue, 0);
      return total;
    }
    return 0;
  }

  render() {
    const { user } = this.props;
    const { email } = user;
    return (
      <div>
        <header className="header">
          <h1>TRYBE WALLET</h1>
          <div>
            <h3>Email: </h3>
            <span data-testid="email-field">{ email }</span>
            <h3>Despesa Total: </h3>
            <span data-testid="total-field">{ this.despesaTotal() }</span>
            <h3>Moeda: </h3>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
