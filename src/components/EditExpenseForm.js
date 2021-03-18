import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as WalletActions } from '../actions/wallet';

import ExpenseForm from './ExpenseForm';

import expenseType from '../types';

class EditExpenseForm extends Component {
  render() {
    const { expenses, idToEdit, saveExpense } = this.props;
    const expenseToEdit = { ...expenses.find((expense) => expense.id === idToEdit) };
    delete expenseToEdit.exchangeRates;
    return (
      <ExpenseForm
        initialState={ expenseToEdit }
        buttonText="Editar despesa"
        buttonAction={ saveExpense }
      />
    );
  }
}

EditExpenseForm.propTypes = {
  expenses: PropTypes.arrayOf(expenseType).isRequired,
  idToEdit: PropTypes.number.isRequired,
  saveExpense: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  idToEdit: wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseForm);
