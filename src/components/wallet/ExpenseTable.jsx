import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Expense from './expenseTable/Expense';
import TableHeader from './expenseTable/TableHeader';

function ExpenseTable({ expenses }) {
  // console.log(expenses);
  return (
    <table border="solid">
      <TableHeader />
      {expenses.length > 0 && expenses.map((expense, i) => (
        <Expense key={ i } expense={ expense } />
      ))}

    </table>
  );
}

ExpenseTable.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

// const mapDispatchToProps = {

// };

export default connect(mapStateToProps, null)(ExpenseTable);
