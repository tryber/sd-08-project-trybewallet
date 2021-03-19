import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.renderExpenseRow = this.renderExpenseRow.bind(this);
  }

  renderExpenseRow(expense) {
    const { deleteExpense, callback } = this.props;
    return (
      <tr key={ expense.id }>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ expense.value }</td>
        <td>{ expense.exchangeRates[expense.currency].name }</td>
        <td>
          {
            Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
          }
        </td>
        <td>
          {
            (Number(expense.value) * Number(
              expense.exchangeRates[expense.currency].ask,
            )).toFixed(2)
          }
        </td>
        <td>Real</td>
        <td>
          <span>
            <button
              type="button"
              data-testid="edit-btn"
              onClick={ () => {
                callback(expense.id);
              } }
            >
              Editar
            </button>
          </span>
          <span>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => {
                deleteExpense(expense.id);
              } }
            >
              Excluir
            </button>
          </span>
        </td>
      </tr>
    );
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
          {expenses
            ? expenses.map((expense) => (
              this.renderExpenseRow(expense)
            ))
            : null }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenseId) => dispatch(removeExpense(expenseId)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
      ask: PropTypes.number,
    }),
  })).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
