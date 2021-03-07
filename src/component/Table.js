import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  renderExpenses(expense) {
    const { value, description, currency, method, tag, exchangeRates } = expense;
    const currencyData = exchangeRates[currency];
    const convertvalue = Number(value) * Number(currencyData.ask);
    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currencyData.name }</td>
        <td>{ (Math.round(currencyData.ask * 100) / 100).toFixed(2) }</td>
        <td>{ (Math.round(convertvalue * 100) / 100).toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button type="button">Editar</button>
          <button type="button">Excluir</button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>
        <tbody>
          { expenses.map((expense) => this.renderExpenses(expense)) }
        </tbody>
      </table>
    );
  }
}
Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const MapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(MapStateToProps)(Table);
