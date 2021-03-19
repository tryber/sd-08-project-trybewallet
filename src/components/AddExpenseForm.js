import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as WalletActions } from '../actions/wallet';

import ExpensesForm from './ExpenseForm';

const INITIAL_STATE = {
  fields: {
    value: '0',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  },
};

class AddExpenseForm extends Component {
  render() {
    const { addExpenseWithCoins } = this.props;
    return (
      <ExpensesForm
        initialState={ INITIAL_STATE }
        buttonAction={ addExpenseWithCoins }
        buttonText="Adicionar despesa"
      />
    );
  }
}

AddExpenseForm.propTypes = {
  addExpenseWithCoins: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

export default connect(null, mapDispatchToProps)(AddExpenseForm);
