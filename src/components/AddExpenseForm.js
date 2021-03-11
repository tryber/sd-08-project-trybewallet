import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as WalletActions } from '../actions/wallet';

import ExpenseForm from './ExpenseForm';

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
        color="rgba(158, 0, 0, 0.6)"
      />
    );
  }
}

AddExpenseForm.propTypes = {
  addExpenseWithCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

export default connect(null, mapDispatchToProps)(AddExpenseForm);
