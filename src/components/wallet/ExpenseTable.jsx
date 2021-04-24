import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Expense from './expenseTable/Expense';
import TableHeader from './expenseTable/TableHeader';
import { deleteExpense, editExpense } from '../../actions/wallet.actions';

function ExpenseTable(props) {
  const { expenses } = props;
  return (
    <table border="solid">
      <thead>
        <TableHeader />
      </thead>
      <tbody>
        {expenses.length > 0 && expenses.map((expense, i) => (
          <Expense
            key={ i }
            expense={ expense }
            { ...props }
          />
        ))}
      </tbody>

    </table>
  );
}

ExpenseTable.propTypes = {
  expenses: PropTypes.array,
  deleteExp: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExp: (id) => dispatch(deleteExpense(id)),
  editExp: (id) => dispatch(editExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
