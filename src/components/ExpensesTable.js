import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteExpenses, edit } from '../actions/wallet';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this);
  }

  handleDeleteExpense(id) {
    const { deleteExpenses: deleteExpensesAction } = this.props;
    deleteExpensesAction(id);
  }

  handleEditExpenses(id) {
    const { edit: editAction } = this.props;
    editAction(id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <tr key={ expenses.id }>
        <td>{ expenses.description }</td>
        <td>{ expenses.tag }</td>
        <td>{ expenses.method }</td>
        <td>{ expenses.value }</td>
        <td>{ expenses.exchangeRates[expenses.currency].name }</td>
        <td>
          { parseFloat(expenses.exchangeRates[expenses.currency].ask).toFixed(2) }
        </td>
        <td>
          { (parseFloat(expenses.exchangeRates[expenses.currency].ask
            * parseFloat(expenses.value))).toFixed(2) }
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testId="delete-btn"
            onClick={ () => this.handleDeleteExpense(expenses.id) }
          >
            Delete
          </button>
          <button
            type="button"
            data-testId="edit-btn"
            onClick={ () => this.handleEditExpenses(expenses.id) }
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])).isRequired,
  deleteExpenses: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  deleteExpenses,
  edit,
};

export default connect(null, mapDispatchToProps)(ExpensesTable);
