import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrencies as getCurrencies } from '../actions';
import { EntriesForm, NewEntries } from '../components';

class Wallet extends React.Component {
  constructor() {
    super();

    this.getTotalValue = this.getTotalValue.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  getTotalValue() {
    const { expenses } = this.props;
    const totalValue = expenses.reduce((total, each) => {
      const { value, currency, exchangeRates } = each;
      const rate = parseFloat(exchangeRates[currency].ask);
      return total + parseFloat(value) * rate;
    }, 0);
    return totalValue.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <div>
            <span data-testid="total-field">
              {this.getTotalValue()}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <NewEntries />
        <EntriesForm />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

Wallet.defaultProps = {
  expenses: [],
};
