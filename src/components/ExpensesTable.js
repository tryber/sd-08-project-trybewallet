import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateExpense } from '../actions';

class ExpensesTable extends React.Component {
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
            data-testid="edit-btn"
            onClick={ () => this.editClick(expense) }
          >
            Edit
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.deleteClick(index) }
          >
            X
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      // https://www.w3schools.com/tags/tag_thead.asp
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
          {expenses.map(this.renderExpense)}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpenses: (expenses) => dispatch(updateExpense(expenses)),
});

ExpensesTable.propTypes = ({
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateExpenses: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

// export default connect(mapStateToProps)(ExpensesTable);
// feito code Review from @rosids
