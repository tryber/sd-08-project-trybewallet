import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  handleExpenseValue() {
    const { expenses } = this.props;
    return expenses
      .reduce((acc, expense) => {
        const value = parseFloat(expense.value);
        const rate = parseFloat(expense.exchangeRates[expense.currency].ask);
        return acc + (value * rate);
      }, 0);
  }

  render() {
    const { email } = this.props;

    return (
      <header>
        <div>myFinance</div>
        <div className="user-wrapper">
          <img src="" alt="PH" />
          <div>
            <span data-testid="email-field">{ email }</span>
            <span>
              Balanço do mês:
              {' '}
              <span data-testid="header-currency-field">BRL</span>
              {' '}
              <span data-testid="total-field">
                {this.handleExpenseValue()}
              </span>
            </span>
          </div>
        </div>
      </header>
    );
  }
}

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletHeader);
