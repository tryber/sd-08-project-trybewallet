import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { delExpense, editRequest } from '../actions';

class ExpenseLine extends Component {
  constructor() {
    super();
    this.edtRequest = this.edtRequest.bind(this);
    this.delExpense = this.delExpense.bind(this);
    this.convertValues = this.convertValues.bind(this);
  }

  edtRequest({ target }) {
    const { edtRequest } = this.props;
    edtRequest(parseInt(target.parentElement.parentElement.id, 10), true);
  }

  delExpense({ target }) {
    const { delExpenseAct } = this.props;
    delExpenseAct(parseInt(target.parentElement.parentElement.id, 10));
  }

  convertValues(value) {
    const MULTIPLY = 100;
    const { expense: { currency, exchangeRates } } = this.props;
    return (
      Math.round(value * exchangeRates[currency].ask * MULTIPLY) / MULTIPLY
    );
  }

  render() {
    const { expense } = this.props;
    const {
      id,
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
    } = expense;
    return (
      <tr id={ id }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{exchangeRates[currency].name}</td>
        <td>{this.convertValues(1).toFixed(2)}</td>
        <td>{this.convertValues(value).toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            id="edit-btn"
            data-testid="edit-btn"
            onClick={ this.edtRequest }
          >
            Edt
          </button>
        </td>
        <td>
          <button
            type="button"
            id="delete-btn"
            data-testid="delete-btn"
            onClick={ this.delExpense }
          >
            Del
          </button>
        </td>
      </tr>
    );
  }
}

ExpenseLine.propTypes = {
  delExpenseAct: PropTypes.func,
  expense: PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  delExpenseAct: (id) => dispatch(delExpense(id)),
  edtRequest: (id, boolean) => dispatch(editRequest(id, boolean)),
});

export default connect(null, mapDispatchToProps)(ExpenseLine);
