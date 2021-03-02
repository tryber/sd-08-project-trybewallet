import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TableComponent extends React.Component {
  renderExpenseRow(expense) {
    const { description, tag, method, value, currency, exchangeRates } = expense;
    const exchangeRatesCurrency = exchangeRates[currency];
    const expenseConverted = Number(value) * Number(exchangeRatesCurrency.ask);
    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{exchangeRatesCurrency.name}</td>
        <td>{ (Math.round(exchangeRatesCurrency.ask * 100) / 100).toFixed(2)}</td>
        <td>{ (Math.round(expenseConverted * 100) / 100).toFixed(2)}</td>
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
          { expenses.map((expense) => this.renderExpenseRow(expense))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

TableComponent.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(TableComponent);
