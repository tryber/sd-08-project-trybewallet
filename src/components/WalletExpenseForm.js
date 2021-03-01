import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { wallet } from '../actions';
import expensesData from '../data/expense';
import WalletSpent from './WalletSpent';

class WalletExpenseForm extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            {expensesData.headForm.map((tag, index) => (
              <th key={ index }>
                {tag}
              </th>
            ))}
          </tr>
          {expenses.map((expense, index) => (
            <WalletSpent key={ index } expense={ expense } />
          ))}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ wallet: { expenses } }) {
  return {
    expenses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCurrentExchange: bindActionCreators(wallet, dispatch),
  };
}

WalletExpenseForm.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      ask: PropTypes.string.isRequired,
      exchangeRates: PropTypes.shape(PropTypes.object),
    }),
  ),
};

WalletExpenseForm.defaultProps = {
  expenses: [{ exchangeRates: {} }],
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpenseForm);
