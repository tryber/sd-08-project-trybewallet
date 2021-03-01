import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ExpensesTable.css';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions';

class ExpensesTable extends Component {
  constructor() {
    super();
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.renderTableRows = this.renderTableRows.bind(this);
  }

  renderTableHeader() {
    return (
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
    );
  }

  renderTableRows() {
    const { expenses, deleteExpense } = this.props;
    return expenses.map((expense) => {
      const exchangeRate = expense.exchangeRates[`${expense.currency}`].ask;
      const coinName = expense.exchangeRates[`${expense.currency}`].name;
      return (
        <tr key={ expense.id }>
          <td>{ expense.description }</td>
          <td>{ expense.tag }</td>
          <td>{ expense.method }</td>
          <td>{ expense.value }</td>
          <td>{ coinName }</td>
          <td>{ (parseFloat(exchangeRate)).toFixed(2) }</td>
          <td>{ (parseFloat(expense.value) * parseFloat(exchangeRate)).toFixed(2) }</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => deleteExpense(expense) }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table>
        { this.renderTableHeader() }
        <tbody>
          { this.renderTableRows() }
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.shape([{}]).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(removeExpense(expense.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
