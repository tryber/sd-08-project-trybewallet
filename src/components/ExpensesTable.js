import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as WalletActions } from '../actions/wallet';

import expenseType from '../types';

import styles from '../styles/components/ExpensesTable.module.css';

class ExpensesTable extends Component {
  renderExpenseRow(expense) {
    const { removeExpense, editExpense } = this.props;
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
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => editExpense(id) }
          >
            Editar
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => removeExpense(id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className={ styles.expensesTableContainer }>
        <table className={ styles.expensesTable }>
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
            { expenses.map((expense) => this.renderExpenseRow(expense)) }
          </tbody>
        </table>
      </div>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(expenseType).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
