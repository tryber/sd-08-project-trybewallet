import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.registerExpenses = this.registerExpenses.bind(this);
  }

  registerExpenses() {
    const { expenses } = this.props;
    const totalExpenses = expenses.reduce((accumulator, expense) => accumulator
      + parseFloat(expense.exchangeRates[expense.currency].ask)
      * parseFloat(expense.value), 0);
    return parseFloat(totalExpenses).toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <span
          data-testid="email-field"
        >
          Usuário:
          { email }
        </span>
        <span
          data-testid="total-field"
        >
          Despesa Total:
          { this.registerExpenses() }
        </span>
        <span
          data-testid="header-currency-field"
        >
          Câmbio: BRL
        </span>
      </div>
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
