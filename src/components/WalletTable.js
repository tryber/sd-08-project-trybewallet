import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  editExpense as editExpenseAction,
  deleteExpense as deleteExpenseAction } from '../actions/wallet';

class WalletTable extends Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(expense) {
    const { editExpense, deleteExpense } = this.props;
    return (
      <td>
        <button
          type="button"
          onClick={ () => editExpense(expense) }
          data-testid="edit-btn"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={ () => deleteExpense(expense) }
          data-testid="delete-btn"
        >
          Excluir
        </button>
      </td>
    );
  }

  renderForm() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Moeda</th>
            <th>Valor</th>
            <th>Câmbio utilizado</th>
            <th>Moeda de conversão</th>
            <th>Valor convertido</th>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            const TEN = 10;
            const {
              description, tag, method, value,
              currency, exchangeRates,
            } = expense;
            const { name, ask } = exchangeRates[currency];
            return (
              <tr key={ index }>
                <td>{name}</td>
                <td>{value}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>Real</td>
                <td>{(ask * Number(value, TEN)).toFixed(2)}</td>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                {this.renderButton(expense)}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    return (this.renderForm());
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  expenseId: state.wallet.expenseId,
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (expense) => dispatch(editExpenseAction(expense)),
  deleteExpense: (expense) => dispatch(deleteExpenseAction(expense)),
});

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  editExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

WalletTable.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
