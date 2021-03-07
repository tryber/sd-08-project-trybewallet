import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  handleDeleteExpense as handleDeleteExpenseAction,
  handleEditExpense as handleEditExpenseAction,
} from '../actions';

class Expenses extends React.Component {
  constructor() {
    super();

    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  handleAddExpense(expense) {
    const { handleDeleteExpense, handleEditExpense } = this.props;

    return (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          {(parseInt(expense.value, 10)
            * parseFloat(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            onClick={ () => handleEditExpense(expense.id) }
            data-testid="edit-btn"
          >
            Editar
          </button>
        </td>
        <td>
          <button
            type="button"
            onClick={ () => handleDeleteExpense(expense.id) }
            data-testid="delete-btn"
          >
            Excluir
          </button>
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

        <tbody>{expenses.map(this.handleAddExpense)}</tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  handleDeleteExpense: (id) => dispatch(handleDeleteExpenseAction(id)),
  handleEditExpense: (id) => dispatch(handleEditExpenseAction(id)),
});

Expenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDeleteExpense: PropTypes.func.isRequired,
  handleEditExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
