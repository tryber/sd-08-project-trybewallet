import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class ExpensesList extends React.Component {
  constructor() {
    super();
    this.deleteClick = this.deleteClick.bind(this);
  }

  deleteClick(index) {
    const { expenses, updateExpenses } = this.props;
    updateExpenses(expenses.filter((expense, expenseIndex) => expenseIndex !== index));
  }

  render() {
    const { expenses } = this.props;
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
          {expenses.map((expense, index) => (
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
                  onClick={ () => this.editClick(index) }
                >
                  Edit
                </button>
                <button type="button" onClick={ () => this.deleteClick(index) }>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpenses: (expenses) => dispatch(deleteExpense(expenses)),
});

ExpensesList.propTypes = ({
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateExpenses: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
