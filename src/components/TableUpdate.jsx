import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, editingExpense } from '../actions/wallet.action';

class TableUpdate extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this);
    this.handleEditExpense = this.handleEditExpense.bind(this);
  }

  handleDeleteExpense(id) {
    const { removeExpense: removeExpenseAction } = this.props;
    removeExpenseAction(id);
  }

  handleEditExpense(id) {
    const { editingExpense: editingExpenseAction } = this.props;
    editingExpenseAction(id);
  }

  render() {
    const { expense } = this.props;
    return (
      <tr>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ expense.value }</td>
        <td>{ expense.exchangeRates[expense.currency].name }</td>
        <td>
          { (parseFloat(expense.exchangeRates[expense.currency].ask
              * parseFloat(expense.value))).toFixed(2) }
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.handleDeleteExpense(expense.id) }
          >
            Delete
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => this.handleEditExpense(expense.id) }
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }
}

TableUpdate.propTypes = {
  expense: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editingExpense: PropTypes.func.isRequired,
};

/*const mapDispatchToProps = {
  removeExpense,
  editingExpense,
};*/

// export default connect(null, mapDispatchToProps)(TableUpdate);

export default TableUpdate;
