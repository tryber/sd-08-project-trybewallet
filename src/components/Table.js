import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/table.css';

class Table extends Component {
  expensesTable({ value, description, currency, method, tag, id, exchangeRates }) {
    const currencyDetails = Object.entries(exchangeRates)
      .find((currencies) => currencies[0] === currency)[1];

    return (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currencyDetails.name }</td>
        <td>{ parseFloat(currencyDetails.ask).toFixed(2) }</td>
        <td>{ (parseFloat(value) * parseFloat(currencyDetails.ask)).toFixed(2) }</td>
        <td>Real</td>
        <td>button</td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;

    return (
      <div className="tableContainer">
        <table className="expenseTable">
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
            { expenses
              .map((expense) => (this.expensesTable(expense)))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
};

Table.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps)(Table);
