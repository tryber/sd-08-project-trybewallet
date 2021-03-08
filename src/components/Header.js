import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      currency: 'BRL',
    };
  }

  componentDidUpdate() {
    this.updateTotal();
  }

  updateTotal() {
    const { total } = this.state;
    const { expenses } = this.props;
    const newTotal = expenses.reduce((prev, newExpense) => {
      const { value, currency, exchangeRates } = newExpense;
      const EX_RATE = Number(exchangeRates[currency].ask);
      return prev + (value * EX_RATE);
    }, 0);
    // console.log(newTotal);
    if (total !== newTotal) {
      return this.setState({ total: newTotal });
    }
  }

  render() {
    const { userEmail } = this.props;
    const { total, currency } = this.state;
    return (
      <div>
        <div data-testid="email-field">
          Email:
          { userEmail }
        </div>
        <div data-testid="total-field">
          Despesa Total:
          { total }
          <span data-testid="header-currency-field">{ currency }</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
