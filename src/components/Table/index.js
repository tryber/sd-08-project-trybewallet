import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor() {
    super();
    this.renderTableHead = this.renderTableHead.bind(this);
    this.renderTableBody = this.renderTableBody.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  handleData(data) {
    const array = data.map((expense) => ({
      description: expense.description,
      tag: expense.tag,
      method: expense.method,
      value: `${expense.currency} ${parseFloat(expense.value).toFixed(2)}`,
      bid: expense.exchangeRates[expense.currency].name,
      rate: expense.exchangeRates[expense.currency].ask,
      convertedValue: (parseFloat(expense.value)
        * parseFloat(expense.exchangeRates[expense.currency].ask)).toFixed(2),
      id: expense.id,
    }));

    return array;
  }

  renderTableHead() {
    const arrayOfHeaders = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    return (
      arrayOfHeaders.map((header) => (
        <th key={ header } width="150px">
          { header }
        </th>
      ))
    );
  }

  renderTableBody(expenses) {
    return (
      expenses.map((expense) => {
        const { id, description, tag, method, value, currency, exchangeRates } = expense;
        const { name, ask } = exchangeRates[currency];
        return (
          <tr key={ id }>
            <td>
              {description}
            </td>
            <td>
              {tag}
            </td>
            <td>
              {method}
            </td>
            <td>
              {value}
            </td>
            <td>
              {name}
            </td>
            <td>
              {parseFloat(ask).toFixed(2)}
            </td>
            <td>
              {(parseFloat(value) * parseFloat(ask)).toFixed(2)}
            </td>
            <td>
              Real
            </td>
            <td>
              excluir
            </td>
          </tr>
        );
      })
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              {this.renderTableHead(expenses)}
            </tr>
          </thead>
          <tbody>
            {this.renderTableBody(expenses)}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
