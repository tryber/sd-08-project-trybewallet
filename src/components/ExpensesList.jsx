import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpense } from '../actions';

import Pen from '../icons/pen-fill.svg';
import Trash from '../icons/trash-fill.svg';

class ExpensesList extends React.Component {
  constructor() {
    super();
    this.deleteClick = this.deleteClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.renderExpense = this.renderExpense.bind(this);
  }

  deleteClick(index) {
    const { expenses, updateExpenses } = this.props;
    updateExpenses(expenses.filter((expense, expenseIndex) => expenseIndex !== index));
  }

  editClick(expense) {
    const { edit } = this.props;
    edit(expense);
  }

  renderExpense(expense, index) {
    return (
      <tr key={ index }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>
          {parseFloat(expense.exchangeRates[expense.currency].ask)
            .toFixed(2)}
        </td>
        <td>
          {expense.value
          * parseFloat(expense.exchangeRates[expense.currency].ask)}
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            className="btn btn-warning"
            data-testid="edit-btn"
            onClick={ () => this.editClick(expense) }
          >
            <img src={ Pen } alt="edit-icon" />
          </button>
          <button
            type="button"
            className="btn btn-danger"
            data-testid="delete-btn"
            onClick={ () => this.deleteClick(index) }
          >
            <img src={ Trash } alt="remove-icon" />
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(this.renderExpense)}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpenses: (expenses) => dispatch(updateExpense(expenses)),
});

ExpensesList.propTypes = ({
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateExpenses: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
