import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  deleteExpenseUser as deleteExpense,
  editModeUser as editMode,
} from '../actions';

class ExpenseTable extends Component {
  expenseDescription(
    descriptionsTable,
    expenses,
    deleteExpenseUserAction,
    editModeUserAction,
  ) {
    // recebe a descrição da tabela, todas as despesas,  e duas callback, uma para DELETAR a linha da tabela e outra para ligar o mode edição da página
    return (
      <table>
        <thead className="table-header">
          <tr>
            {descriptionsTable.map((element, index) => ( // cria o cabeçalho da tabela
              <th key={ index }>
                {element}
              </th>))}
          </tr>
        </thead>
        <tbody className="table-body">
          {expenses.map((expense, index) => { // Cria cada linha para cada despesa
            const { description, tag, method, value, currency,
              exchangeRates, id } = expense;
            const { ask, name } = exchangeRates[currency];
            return (
              <tr key={ index } role="row">
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{name}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>{(Number(ask) * value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  {this.renderButton('delete', id, deleteExpenseUserAction)}
                  {this.renderButton('edit', id, editModeUserAction)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  renderButton(name, id, callback) {
    // Recebe qual nome vai ter o botão, o id da linha que foi clicada, e a callback que será disparada
    return (
      <button
        type="button"
        data-testid={ `${name}-btn` }
        onClick={ () => callback(id, 1) }
        className={ `${name}-btn` }
      >
        {name}
      </button>
    );
  }

  render() {
    const descriptionsTable = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
      'Editar/Excluir']; // Tirar do render, dica: constructor
    const { expenses, deleteExpenseUserAction, editModeUserAction } = this.props;
    return (

      <div>
        {this.expenseDescription(descriptionsTable, expenses,
          deleteExpenseUserAction, editModeUserAction)}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseUserAction: PropTypes.func.isRequired,
  editModeUserAction: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  deleteExpenseUserAction: (id) => dispatch(deleteExpense(id)),
  editModeUserAction: (...args) => dispatch(editMode(...args)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
