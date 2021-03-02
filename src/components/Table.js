import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteExpense as deleteExpenseAction,
  editingExpense as editingExpenseAction }
  from '../actions';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.renderTableHeader = this.renderTableHeader.bind(this);
  }

  renderTableHeader() {
    return (
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
    );
  }

  render() {
    const { expenses, deleteExpense, editingExpense } = this.props;
    return (
      <table>
        <thead>
          {this.renderTableHeader()}
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const { description,
              tag,
              method,
              value,
              currency,
              exchangeRates,
              id,
            } = expense;
            const { name, ask } = exchangeRates[currency];
            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{name}</td>
                <td>{parseFloat(ask).toFixed(2)}</td>
                <td>{(ask * parseInt(value, 10)).toFixed(2)}</td>
                <td>Real</td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => editingExpense(expense) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => deleteExpense(expense) }
                >
                  Excluir
                </button>
              </tr>
            );
          })}
        </tbody>

      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editingExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (totalExpense) => dispatch(deleteExpenseAction(totalExpense)),
  editingExpense: (expense) => dispatch(editingExpenseAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
