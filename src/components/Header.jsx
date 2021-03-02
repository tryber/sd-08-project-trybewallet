import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();

    this.sumExpenses = this.sumExpenses.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (expenses !== prevProps.expenses) {
      this.sumExpenses();
    }
  }

  sumExpenses() {
    const { expenses } = this.props;
    let sum = [];
    const currency = expenses.map((exp) => {
      const rates = Object.values(exp.exchangeRates);
      let conversion;
      rates.forEach((rate) => {
        if (rate.codein === 'BRL' && rate.code === exp.currency) {
          conversion = (rate.ask * exp.value);
        }
      });
      return parseFloat(conversion.toFixed(2));
    });
    sum = [...currency];
    const reduceSum = ((acc, num) => acc + num);
    return sum.reduce(reduceSum, 0).toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header className="wallet-header-container">
        <h4 className="wallet-info-header">
          Email:
          <span data-testid="email-field" className="wallet-info">{ email }</span>
        </h4>
        <h4 className="wallet-info-header">
          Despesas gerais:
          <span
            data-testid="total-field"
            className="wallet-info"
          >
            { this.sumExpenses() }
          </span>
          <span data-testid="header-currency-field" className="wallet-info">BRL</span>
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
