import React from 'react';
import PropTypes from 'prop-types';

class Table extends React.Component {
  constructor() {
    super();
    this.renderTable = this.renderTable.bind(this);
  }

  getName(row) {
    const { name } = row.exchangeRates[row.currency];
    return name;
  }

  roundValue(row) {
    const num = parseFloat(row.exchangeRates[row.currency].ask);
    return num.toFixed(2);
  }

  convertValue(row) {
    const { value } = row;
    const curr = parseFloat(row.exchangeRates[row.currency].ask);
    return (parseFloat(value) * curr).toFixed(2);
  }

  renderTable(list, fill) {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { list.map((row) => (
            <tr key={ row.id }>
              <td>{ row.description }</td>
              <td>{ row.tag }</td>
              <td>{ row.method }</td>
              <td>{ row.value }</td>
              <td>{ this.getName(row, fill) }</td>
              <td>{ this.roundValue(row, fill) }</td>
              <td>{ this.convertValue(row, fill) }</td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }

  render() {
    const { list } = this.props;
    return (
      <section>
        { list.length > 0 ? this.renderTable(list) : <p>nao ha dados</p>}
      </section>
    );
  }
}

Table.propTypes = {
  list: PropTypes.shape(
    PropTypes.array.isRequired,
  ).isRequired,
};

export default Table;
