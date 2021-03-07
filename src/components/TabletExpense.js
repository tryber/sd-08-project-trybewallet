import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/Form.css';

class TabletExpense extends Component {
  expenseRow(expense) {
    const { currency, description, method, tag, value, exchangeRates, id } = expense;
    const currencyDate = exchangeRates[currency];
    const convertedValue = Number(value) * Number(currencyDate.ask);
    return (
      <tr key={ id }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{currencyDate.name}</td>
        <td>{(Math.round(currencyDate.ask * 100) / 100).toFixed(2)}</td>
        <td>{(Math.round(convertedValue * 100) / 100).toFixed(2)}</td>
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
      <div className="FormContainer">
        <table className="FormTable">
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
            {expenses.map((expense) => this.expenseRow(expense))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { wallet } = state;
  return {
    expenses: wallet.expenses,
  };
};

export default connect(mapStateToProps)(TabletExpense);
