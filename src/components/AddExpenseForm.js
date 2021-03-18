import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExpenseForm from './ExpenseForm';

import { Creators as WalletActions } from '../actions/wallet';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class AddExpenseForm extends Component {
  render() {
    const { addExpenseWithCurrencies } = this.props;
    return (
      <ExpenseForm
        initialState={ INITIAL_STATE }
        buttonText="Adicionar despesa"
        buttonAction={ addExpenseWithCurrencies }
      />
    );
  }
}

AddExpenseForm.propTypes = {
  addExpenseWithCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

export default connect(null, mapDispatchToProps)(AddExpenseForm);
