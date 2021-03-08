import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableRows extends Component {
  render() {
    const { expense } = this.props;
    return (
      <tr key={ expense.id }>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ expense.value }</td>
        <td>{ expense.exchangeRates[expense.currency].name }</td>
        <td>{ parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
        <td>
          { (parseFloat(expense.exchangeRates[expense.currency].ask
            * parseFloat(expense.value))).toFixed(2) }
        </td>
        <td>Real</td>
      </tr>
    );
  }
}

TableRows.propTypes = {
  expense: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])).isRequired,
};
export default TableRows;
