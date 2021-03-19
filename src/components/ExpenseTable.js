import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  deleteExpenseAction,
  editExpenseAction,
} from '../actions';

const descriptionsTable = ['Descrição', 'Tag', 'Método de pagamento',
  'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
  'Editar/Excluir'];

class ExpenseTable extends Component {
  expenseDescription(
    expenses,
    deleteExpense,
    editExpense,
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
                  {this.renderButton('delete', id, deleteExpense)}
                  {this.renderButton('edit', id, editExpense)}
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
    const { expenses, deleteExpense, editExpense } = this.props;
    return (
      <div>
        { expenses.length && this.expenseDescription(expenses,
          deleteExpense, editExpense)}
      </div>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
  editExpense: (id) => dispatch(editExpenseAction(id)),
  editMode: (id) => dispatch(editExpenseAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
