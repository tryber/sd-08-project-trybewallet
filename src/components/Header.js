import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();

    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
    const { expenses } = this.props;
    const result = expenses.reduce((first, next) => {
      const { value, exchangeRates } = next;
      return first + parseFloat(value) * parseFloat(exchangeRates[next.currency].ask);
    }, 0);
    return result.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <h4 data-testid="email-field">{ `Caro Sr. ${email}` }</h4>
        <h4
          data-testid="total-field"
        >
          {`Total das despesas é a Bagatela de R$ ${this.totalExpenses()}`}
        </h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  // totalExpenses: state.wallet.totalExpenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
  // totalExpenses: PropTypes.number,
};

Header.defaultProps = {
  expenses: [],
  // totalExpenses: 0,
};
