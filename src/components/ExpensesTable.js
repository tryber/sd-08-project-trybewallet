import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import expenseType from '../types';

import '../styles/components/ExpensesTable.css';

class ExpensesTable extends Component {
  renderExpenseRow(expense) {
    const { currency, description, method, tag, value, exchangeRates, id } = expense;
    const currencyData = exchangeRates[currency];
    const convertedValue = Number(value) * Number(currencyData.ask);
    return (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currencyData.name }</td>
        <td>{ (Math.round(currencyData.ask * 100) / 100).toFixed(2) }</td>
        <td>{ (Math.round(convertedValue * 100) / 100).toFixed(2) }</td>
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
      <div className="expensesTableContainer">
        <table className="expensesTable">
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
            {expenses.map((expense) => this.renderExpenseRow(expense))}
          </tbody>
        </table>
      </div>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(expenseType).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);
