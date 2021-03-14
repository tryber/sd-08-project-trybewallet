import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Form from './Form';
import { saveExpense } from '../actions';

class TemplateEdit extends React.Component {
  render() {
    //  Lógica do requisito 7 aprendida junto ao plantão do fds
    const { expenses, idToEdit, saveExpenses } = this.props;
    const expensetoEdt = { ...expenses.find((expense) => expense.id === idToEdit) };
    delete expensetoEdt.exchangeRates;
    return (
      <Form
        initialState={ expensetoEdt }
        buttonText="Editar despesa"
        buttonAction={ saveExpenses }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (state) => dispatch(saveExpense(state)),
});

TemplateEdit.propTypes = {
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateEdit);
