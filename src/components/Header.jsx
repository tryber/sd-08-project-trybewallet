import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();

    this.sumExpenses = this.sumExpenses.bind(this);
  }

  componentDidUpdate() {
    this.sumExpenses();
  }

  sumExpenses() {
    const { expenses } = this.props;
    const currency = expenses.forEach((exp) => {
      const rates = [...exp.exchangeRates];

      return rates;
    });
    // if (expenses.length > 0) {
    //   const getCurrencyRate = expenses
    //     .map((exp) => (exp.currency === exp.exchangeRates.code)
    //       && exp.exchangeRates.ask);
    //   console.log(getCurrencyRate);
    // }
    console.log(currency);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h4>
          Email:
          <span data-testid="email-field">{ email }</span>
        </h4>
        <h4>
          Despesas gerais:
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
