import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteExpenseUser as deleteExpense,
  editarExpenseUser as editExpense } from '../actions';

class ExpenseTable extends Component {
  expenseDescription(descriptions, expenses, deleteExpenseUser, editarExpenseUser) {
    return (
      <table>
        <thead className="table-header">
          <tr>
            {descriptions.map((element, index) => (
              <th key={ index }>
                {element}
              </th>))}
          </tr>
        </thead>
        <tbody className="table-body">
          {expenses.map((expense) => {
            const { description, tag, method, value, currency,
              exchangeRates, id } = expense;
            const { ask, name } = exchangeRates[currency];
            return (
              <tr key={ id } role="row">
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{name}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>{(Number(ask) * value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  {this.renderButton('delete', id, deleteExpenseUser)}
                  {this.renderButton('edit', id, editarExpenseUser)}
                  {' '}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  renderButton(name, id, callback) {
    return (
      <button
        type="button"
        data-testid={ `${name}-btn` }
        onClick={ () => callback(id) }
        className={ `${name}-btn expense-opt-btn` }
      >
        {name}
      </button>
    );
  }

  render() {
    const descriptions = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
      'Editar/Excluir'];
    const { expenses, deleteExpenseUser, editarExpenseUser } = this.props;
    return (

      <div>
        {this.expenseDescription(descriptions, expenses,
          deleteExpenseUser, editarExpenseUser)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseUser: PropTypes.func.isRequired,
  editarExpenseUser: PropTypes.func.isRequired,

};

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseUser: (id) => dispatch(deleteExpense(id)),
  editarExpenseUser: (id) => dispatch(editExpense(id)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
