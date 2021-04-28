import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, updateExpense } from '../actions/wallet';
import MyTableHead from './MyTableHead';

const WalletTable = (props) => {
  const { expenses, deleteExp, updateExp, deleteTotal } = props;

  const handleDelete = (index) => {
    const { value, exchangeRates, currency } = expenses[index];
    const expenseExchange = exchangeRates[currency];
    console.log(expenseExchange);
    console.log(value);
    const totalExpense = parseFloat(expenseExchange.ask) * parseFloat(value);
    console.log(totalExpense);

    deleteTotal(totalExpense);
    deleteExp(index);
  };

  return (
    <table>
      <MyTableHead />
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={ index }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            {console.log(expense.exchangeRates[expense.currency].name)}
            <td>{expense.value}</td>
            <td>{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
            <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
            <td>{expense.value * expense.exchangeRates[expense.currency].ask}</td>
            <td>Real</td>
            <input
              type="button"
              data-testid="edit-btn"
              value="Editar"
              onClick={ () => updateExp(index) }
            />
            <input
              type="button"
              data-testid="delete-btn"
              value="Excluir"
              onClick={ () => handleDelete(index) }
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExp: (expense) => dispatch(deleteExpense(expense)),
  updateExp: (expense) => dispatch(updateExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
