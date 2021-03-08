import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();

    this.sumOfExpenses = this.sumOfExpenses.bind(this);
  }

  sumOfExpenses() {
    const { allExpenses } = this.props;
    const TotalExpenses = allExpenses.reduce((acc, curr) => {
      const { value, exchangeRates, currency } = curr;
      return Number(acc + exchangeRates[currency].ask * value);
    }, 0);
    return TotalExpenses;
  }

  render() {
    const { email, allExpenses = 0 } = this.props;
    return (
      <header>
        <div data-testid="email-field">
          { email }
        </div>
        <div data-testid="total-field">
          {allExpenses && allExpenses.length > 0
            ? this.sumOfExpenses().toFixed(2) : 0 }
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  allExpenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  allExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
