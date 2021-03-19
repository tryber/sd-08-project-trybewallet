import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpenseAction } from '../actions';

class Table extends Component {
  constructor() {
    super();
    this.sumExpense = this.sumExpense.bind(this);
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this);
    this.handleEditExpense = this.handleEditExpense.bind(this);
  }

  handleDeleteExpense(id, expenses) {
    const { deleteExpenseAction } = this.props;
    deleteExpenseAction(id, expenses);
  }

  handleEditExpense(expense) {
    const { editExpense } = this.props;
    editExpense(expense);
  }

  sumExpense(expense, cambio) {
    parseFloat(expense.value * cambio).toFixed(2);
  }

  renderTable() {
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
      </table>
    );
  }

  renderTableTwo() {
    const { expenses } = this.props;
    return (
      <tbody>
        { expenses.length > 0 ? (
          expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {parseFloat(
                  expense.exchangeRates[expense.currency].ask,
                ).toFixed(2)}
              </td>
              <td>
                {parseFloat(
                  expense.value * expense.exchangeRates[expense.currency].ask,
                ).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => {
                    this.handleDeleteExpense(expense.id, expenses);
                  } }
                >
                  Excluir
                </button>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => {
                    this.handleEditExpense(expense);
                  } }
                >
                  Editar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <td>Teste</td>)}
      </tbody>
    );
  }

  render() {
    return (
      <div>
        { this.renderTable() }
        { this.renderTableTwo() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseAction: (id, expenses) => dispatch(deleteExpense(id, expenses)),
  editExpense: (expense) => dispatch(editExpenseAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(String, Number).isRequired,
  deleteExpenseAction: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};
