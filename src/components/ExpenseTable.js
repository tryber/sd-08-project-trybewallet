import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDeleteExpenses } from '../actions/walletActions';

import './ExpenseTable.css';

// https://pt.stackoverflow.com/questions/456689/filtro-de-tabela-pelo-nome-em-react
class ExpenseTable extends React.Component {
  deleteExpense(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  render() {
    const { expenses } = this.props;
    const tableTitle = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    return (
      <table className="expense-table">
        <thead>
          <tr>
            {tableTitle.map((title) => (
              <th className="title" key={ title }>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td className="data">{expense.description}</td>
              <td className="data">{expense.tag}</td>
              <td className="data">{expense.method}</td>
              <td className="data">{expense.value}</td>
              {/* Auxílio do especialista Ícaro Harry (plantão dia 01/03/2021) */}
              <td className="data">{expense.exchangeRates[expense.currency].name}</td>
              <td className="data">
                {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td className="data">
                {parseFloat(expense.value * expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)}
              </td>
              {/* ------------------------------------------------------------- */}
              <td className="data">Real</td>
              <td className="data">
                <button className="edit-expense" type="button">Editar</button>
                <button
                  className="delete-expense"
                  type="button"
                  onClick={ () => this.deleteExpense(expense.id) }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(actionDeleteExpenses(id)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
