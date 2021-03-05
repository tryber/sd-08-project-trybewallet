import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import AddExpense from '../components/AddExpense';

class Wallet extends React.Component {
  verifyTotal() {
    const { totalExpenses } = this.props;
    // console.log(totalExpenses);
    return totalExpenses.reduce((acc, cur) => {
      const { value, currency, exchangeRates } = cur;
      const arr = Object.entries(exchangeRates)
        .map((d) => d[1]);
      const { ask } = arr.find((c) => c.code === currency);
      // console.log(ask);
      return acc + (value * ask);
    }, 0);
  }

  render() {
    const { user } = this.props;
    // console.log(totalExpenses);
    return (
      <div className="container wallet-container">
        <Header email={ user } total={ this.verifyTotal() } />
        <AddExpense />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  totalExpenses: state.wallet.expenses,
});
// const mapDispatchToProps = () => ({});

Wallet.propTypes = {
  totalExpenses: PropTypes.arrayOf({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.object,
  }).isRequired,
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
