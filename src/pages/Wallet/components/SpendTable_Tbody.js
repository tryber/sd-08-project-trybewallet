import React from 'react';
import PropTypes from 'prop-types';

const Tbody = ({ expenses, editExp, deleteExp }) => (
  <tbody>
    { expenses.map((expense) => {
      const { id, description, tag, method, value, currency, exchangeRates: {
        [currency]: { ask, name },
      } } = expense;
      const res = Math.round((ask * value) * 100) / 100;
      return (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ name }</td>
          <td>{ Number(ask).toFixed(2) }</td>
          <td>{ res }</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="edit-btn"
              onClick={ () => editExp(expense) }
            >
              editar
            </button>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => deleteExp(id, expenses) }
            >
              deletar
            </button>
          </td>
        </tr>);
    })}
  </tbody>
);

Tbody.propTypes = {
  editExp: PropTypes.func.isRequired,
  deleteExp: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default Tbody;
