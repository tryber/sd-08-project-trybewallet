import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();

    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses() {
    const { expenses } = this.props;
    if (expenses.length === 0) return 0;

    const arrayOFCurrencies = expenses
      .map((currencie) => currencie.exchangeRates[currencie.currency].ask);

    const arrayOFExpenses = expenses.map((cada) => parseFloat(cada.value));

    let sum = 0;
    arrayOFExpenses.forEach((element, index) => {
      sum += element * arrayOFCurrencies[index];
    });
    console.log(sum);
    return sum;
  }

  render() {
    const { userData } = this.props;

    return (
      <>
        <header data-testid="email-field">
          <h2> Trybe Wallet </h2>
          <span>
            {userData.email}
          </span>
        </header>
        <p id="total" data-testid="total-field">
          {this.sumExpenses()}
        </p>
        <p data-testid="header-currency-field"> BRL </p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userData: PropTypes.string.isRequired,
  expenses: PropTypes.node.isRequired,
};

export default connect(mapStateToProps)(Header);
