import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense as deleteExpenseAction,
  editExpense as editExpenseAction } from '../actions';
import './WalletTable.css';

class WalletTable extends React.Component {
  constructor() {
    super();
    this.deleteExpense = this.deleteExpense.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  deleteExpense({ target }) {
    const { expenses, deleteExpense } = this.props;
    const newExpensesList = expenses
      .filter((expense) => expense.description !== target.value);
    deleteExpense(newExpensesList);
  }

  handleClick(expense) {
    const { editExpense } = this.props;
    editExpense(expense);
  }

  render() {
    const { expenses } = this.props;
    const fields = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <tbody>
          <tr>
            {fields.map((field) => <th key={ field }>{field}</th>)}
          </tr>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
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
                {parseFloat(
                  expense.value * expense.exchangeRates[expense.currency].ask,
                ).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  value={ expense.description }
                  onClick={ () => this.handleClick(expense) }
                  data-testid="edit-btn"
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  value={ expense.description }
                  onClick={ this.deleteExpense }
                >
                  Excluir
                </button>
              </td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenses) => dispatch(deleteExpenseAction(expenses)),
  editExpense: (expense) => dispatch(editExpenseAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};
