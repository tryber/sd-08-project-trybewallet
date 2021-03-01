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
          <tr role="row">
            {expensesData.headForm.map((tag, index) => (
              <th role="columnheader" key={ index }>
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
      id: PropTypes.number,
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      tag: PropTypes.string,
      method: PropTypes.string,
      conversionMethod: PropTypes.string,
      ask: PropTypes.string,
      converted: PropTypes.string,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpenseForm);
