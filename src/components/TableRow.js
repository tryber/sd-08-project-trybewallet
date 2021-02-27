import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { removeExpense, isEditing } from '../actions';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
  }

  handleDeleteItem(id) {
    const { removeExpense: removeExpenseAction } = this.props;
    removeExpenseAction(id);
  }

  handleEditItem(id) {
    const { isEditing: isEditingAction } = this.props;
    isEditingAction(id);
  }

  render() {
    const { expense } = this.props;

    return (
      <tr key={ expense.id }>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>
          { expense.value }
        </td>
        <td>{ expense.exchangeRates[expense.currency].name }</td>
        <td>
          { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
        </td>
        <td>
          { (parseFloat(expense.exchangeRates[expense.currency].ask
              * parseFloat(expense.value))).toFixed(2) }
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.handleDeleteItem(expense.id) }
          >
            Delete
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => this.handleEditItem(expense.id) }
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }
}

TableRow.propTypes = {
  expense: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])).isRequired,
  removeExpense: PropTypes.func.isRequired,
  isEditing: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  removeExpense,
  isEditing,
};

export default connect(null, mapDispatchToProps)(TableRow);
