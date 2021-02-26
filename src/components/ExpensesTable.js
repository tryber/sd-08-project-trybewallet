import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteExpense as eraseExpense } from '../actions';

const ExpensesTable = ({ expenses, deleteExpense }) => (
  <table>
    <thead>
      <tr>
        <th>Moeda</th>
        <th>Valor</th>
        <th>Câmbio utilizado</th>
        <th>Moeda de conversão</th>
        <th>Valor convertido</th>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Editar/Excluir</th>
      </tr>
    </thead>
    <tbody>
      {expenses.map((expense, index) => {
        const { description, tag, method, value, currency, exchangeRates } = expense;
        const { name, ask } = exchangeRates[currency];
        return (
          <tr key={ index }>
            <td>{name}</td>
            <td>{value}</td>
            <td>{parseFloat(ask).toFixed(2)}</td>
            <td>Real</td>
            <td>{(ask * parseInt(value, 10)).toFixed(2)}</td>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => deleteExpense(expense) }
              >
                Excluir
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(eraseExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  deleteExpense: PropTypes.func.isRequired,
};

ExpensesTable.defaultProps = {
  expenses: [],
};
