import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as WalletActions } from '../actions/wallet';

import ExpenseForm from './ExpenseForm';

class EditExpenseForm extends Component {
  render() {
    const { saveExpense, expenses, idToEdit } = this.props;
    const expenseBeingEdited = { ...expenses.find((expense) => expense.id === idToEdit) };
    delete expenseBeingEdited.exchangeRates;

    return (
      <ExpenseForm
        initialState={ { fields: expenseBeingEdited } }
        buttonAction={ saveExpense }
        buttonText="Editar Despesa"
      />
    );
  }
}

EditExpenseForm.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  idToEdit: wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseForm);
