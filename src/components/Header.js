import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.getTotalExpenses = this.getTotalExpenses.bind(this);
  }

  getTotalExpenses() {
    const { expenses } = this.props;
    const totalExpenses = expenses.reduce((total, each) => {
      const { value, currency, exchangeRates } = each;
      const rate = parseFloat(exchangeRates[currency].ask);
      return total + parseFloat(value) * rate;
    }, 0);
    return totalExpenses.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">{`E-mail: ${email}`}</h3>
        <h3 data-testid="total-field">
          {`Despesa Total: R$ ${this.getTotalExpenses()} `}
        </h3>
        <h3 data-testid="header-currency-field">BRL</h3>
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
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
