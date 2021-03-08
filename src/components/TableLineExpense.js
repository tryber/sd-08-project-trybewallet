import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableLineExpense extends Component {
  render() {
    const { expense } = this.props;
    const exchange = parseFloat(
      expense.exchangeRates[expense.currency].ask,
    );
    return (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>{exchange.toFixed(2)}</td>
        <td>
          {(parseInt(expense.value, 10) * exchange).toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
          >
            Editar
          </button>
        </td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }
}

TableLineExpense.propTypes = {
  expense: PropTypes.objectOf.isRequired,
};

export default TableLineExpense;
