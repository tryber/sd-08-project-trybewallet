import React from 'react';
import PropTypes from 'prop-types';

class TableRow extends React.Component {
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
        <td><button type="button" data-testid="delete-btn">Excluir</button></td>
      </tr>
    );
  }
}

TableRow.propTypes = {
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

export default TableRow;
