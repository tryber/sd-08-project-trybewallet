import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableItem extends Component {
  render() {
    const { expense, handleClick } = this.props;
    const exchangeRates = expense.exchangeRates[expense.currency];
    const atualizedCurr = exchangeRates.ask;
    const currencyName = exchangeRates.name;
    const convertValue = expense.value * atualizedCurr;
    return (
      <tr>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.currency}</td>
        <td>{atualizedCurr}</td>
        <td>{convertValue}</td>
        <td>{currencyName}</td>
        <td>
          <button type="button" onClick={ () => handleClick(expense) }>Excluir</button>
        </td>
      </tr>
    );
  }
}

TableItem.propTypes = {
  expense: PropTypes.array,
}.isRequired;

export default connect()(TableItem);
