import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../actions';

class TableData extends React.Component {
  handleDelete(itemId) {
    const { expenses, deleteExpenseAction } = this.props;
    const filtered = expenses.filter(({ id }) => id !== itemId);
    deleteExpenseAction(filtered);
  }

  handleEdit(item) {
    const { dispatchEdit } = this.props;
    dispatchEdit(item);
  }

  floorCurrency(ask, value) {
    return +(ask * value).toFixed(2);
  }

  render() {
    const { expenses } = this.props;

    return (
      <tbody>
        { expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ expense.exchangeRates[expense.currency].name }</td>
            <td>
              { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
            </td>
            <td>
              { this.floorCurrency(
                expense.exchangeRates[expense.currency].ask, +expense.value,
              ) }
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => this.handleEdit(expense) }
              >
                Edit
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.handleDelete(expense.id) }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}
TableData.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseAction: PropTypes.func.isRequired,
  dispatchEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseAction: (obj) => dispatch(deleteExpense(obj)),
  dispatchEdit: (item) => dispatch(editExpense(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableData);
