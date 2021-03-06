import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RemoveAnExpenseAction } from '../actions';

class TableRow extends React.Component {
  deleteExpense(e) {
    e.preventDefault();
    const { expense, remove } = this.props;
    const { id } = expense;
    remove(id);
  }

  render() {
    const { expense } = this.props;
    const { description, tag, method } = expense;
    const { value, currency } = expense;
    const { exchangeRates } = expense;
    const arr = Object.entries(exchangeRates)
      .map((d) => d[1]);
    const { ask, name } = arr.find((curr) => curr.code === currency);
    const valorConvertido = value * ask;
    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ name }</td>
        <td>{ parseFloat(ask).toFixed(2) }</td>
        <td>{ parseFloat(valorConvertido).toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ (e) => this.deleteExpense(e) }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }
}

TableRow.propTypes = {
  remove: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape(
      PropTypes.string,
    ),
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(RemoveAnExpenseAction(id)),
});

export default connect(null, mapDispatchToProps)(TableRow);
