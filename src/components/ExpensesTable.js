import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  deleteExpense as deleteExpenseAction,
  editExpense as editExpenseAction,
} from '../actions';

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.getTableData = this.getTableData.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
  }

  getTableData() {
    const { expenses } = this.props;
    return expenses.length > 0 && expenses.map(
      ({ id, description, tag, method, value, exchangeRates, currency }) => (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
          <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
          <td>Real</td>
          <td id={ id }>
            { this.renderEditButton() }
            { this.renderDeleteButton() }
          </td>
        </tr>
      ),
    );
  }

  renderDeleteButton() {
    const { deleteExpense } = this.props;
    return (
      <button
        data-testid="delete-btn"
        onClick={ (e) => { deleteExpense(parseInt(e.target.parentElement.id, 10)); } }
        type="button"
      >
        { }
      </button>);
  }

  renderEditButton() {
    const { editExpense } = this.props;
    return (
      <button
        data-testid="edit-btn"
        onClick={ (e) => { editExpense(parseInt(e.target.parentElement.id, 10)); } }
        type="button"
      >
        { }
      </button>);
  }

  render() {
    return (
      <section>
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
            { this.getTableData() }
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(deleteExpenseAction(payload)),
  editExpense: (payload) => dispatch(editExpenseAction(payload)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
