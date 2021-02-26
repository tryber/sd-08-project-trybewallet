import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class TableData extends React.Component {
  handleDelete(itemId) {
    const { expenses, deleteExpenseAction } = this.props;
    const filtered = expenses.filter(({ id }) => id !== itemId);
    deleteExpenseAction(filtered);
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
            <td>{ expense.currency }</td>
            <td>{ expense.exchangeRates[expense.currency].ask }</td>
            <td>
              {
                Math.floor((expense.exchangeRates[expense.currency].ask
                   * +expense.value) * 100) / 100
              }
            </td>
            <td>REAL</td>
            <td>
              <button type="button">Edit</button>
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
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseAction: (obj) => dispatch(deleteExpense(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableData);
