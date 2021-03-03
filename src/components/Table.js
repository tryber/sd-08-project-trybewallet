import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import expenseType from '../types';

class Table extends React.Component {
  renderExpense(expense) {
    const { currency, description, method, tag, value, exchangeRates, id } = expense;
    const curr = exchangeRates[currency];
    const convertValue = Number(value) * Number(curr.ask);
    return (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ curr.name }</td>
        <td>{ (Math.round(curr.ask * 100) / 100).toFixed(2) }</td>
        <td>{ (Math.round(convertValue * 100) / 100).toFixed(2) }</td>
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
      <div>
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
            { expenses.map((expense) => this.renderExpense(expense)) }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(expenseType).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
