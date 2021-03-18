import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletDeleteExpenseAction as walletDeleteExpense } from '../walletActions';

class ExpenseTable extends Component {
  expenseRow() {
    const { expenses, walletDeleteExpenseAction } = this.props;
    return (
      expenses.map((each) => (
        <tr key={ each.id }>
          <td>{each.description}</td>
          <td>{each.tag}</td>
          <td>{each.method}</td>
          <td>{each.value}</td>
          <td>{each.exchangeRates[each.currency].name}</td>
          <td>{parseFloat(each.exchangeRates[each.currency].ask).toFixed(2)}</td>
          <td>
            {parseFloat(each.exchangeRates[each.currency].ask * each.value).toFixed(2)}
          </td>
          <td>Real</td>
          <td>
            <button
              data-testid="delete-btn"
              type="button"
              onClick={ () => walletDeleteExpenseAction(each.id) }
            >
              X
            </button>
          </td>
        </tr>
      ))
    );
  }

  render() {
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
          {this.expenseRow()}
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  walletDeleteExpenseAction: (expense) => dispatch(
    walletDeleteExpense(expense),
  ),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  walletDeleteExpenseAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
