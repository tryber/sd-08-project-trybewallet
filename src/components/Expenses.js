import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import deleteExpenses from '../actions/deleteExpenses';
import { editExpenses } from '../actions/editExpenses';

class Expenses extends React.Component {
  expensesTableRendered() {
    const { deleteExpense, editExpense, expenses } = this.props;
    return expenses.map((expense, index) => (
      <tr key={ index }>
        <td>
          { expense.description }
        </td>
        <td>
          { expense.tag }
        </td>
        <td>
          { expense.method}
        </td>
        <td>
          { parseFloat(expense.value).toFixed(0) }
        </td>
        <td>
          { expense.exchangeRates[expense.currency].name }
        </td>
        <td>
          { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
        </td>
        <td>
          { parseFloat(expense.exchangeRates[expense.currency].ask
            * expense.value).toFixed(2) }
        </td>
        <td> Real </td>
        <tr>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ () => deleteExpense(expense.id) }
          >
            Excluir
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => editExpense(expense.id) }
          >
            Editar
          </button>
        </tr>
      </tr>
    ));
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { this.expensesTableRendered() }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenses(id)),
  editExpense: (id) => dispatch(editExpenses(id)),
});
Expenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
