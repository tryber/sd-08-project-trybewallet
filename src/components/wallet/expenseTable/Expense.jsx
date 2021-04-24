import React from 'react';
import PropTypes from 'prop-types';

function Expense({ expense, deleteExpense }) {
  const { value, description, currency, method, tag, exchangeRates, id } = expense;
  const BASE = 10;
  const { name, ask } = exchangeRates[currency];
  const exchange = parseFloat(ask).toFixed(2);
  const convert = ask * parseFloat(value, BASE).toFixed(2);

  function replacer(str, change, to) {
    const string = str;
    return string.replace(change, to);
  }

  return (
    <tr>
      <td>{description}</td>
      <td>{tag}</td>
      <td>{method}</td>
      <td>{value}</td>
      <td>{replacer(name, '/Real Brasileiro', '')}</td>
      <td>{exchange}</td>
      <td>{convert}</td>
      <td>Real</td>
      <td>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => deleteExpense(id) }
        >
          Deletar
        </button>
      </td>
    </tr>
  );
}

Expense.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default Expense;
