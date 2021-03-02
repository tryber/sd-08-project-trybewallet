import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableHead from './TableHead';
import TableBody from './TableBody';

class ExpensesTable extends Component {
  render() {
    const { expenses, editExpenseValue } = this.props;
    if (expenses.length > 0) {
      return (
        <div className="table-expenses-container">
          <table>
            <TableHead />
            <TableBody editExpenseValue={ editExpenseValue } />
          </table>
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editExpenseValue: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
