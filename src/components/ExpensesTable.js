import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  deleteExpense as deleteExpenseAction,
} from '../actions';

class ExpensesTable extends React.Component {
  renderDeleteBtn() {
    const { deleteExpense } = this.props;
    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ (e) => { deleteExpense(parseInt(e.target.parentElement.id, 10)); } }
      >
        { }
      </button>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Descrição</th>
            <th>Moeda</th>
            <th>Valor</th>
            <th>Moeda de conversão</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Método de pagamento</th>
            <th>Excluir</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense, id) => {
            const { description, tag, method, value, currency, exchangeRates } = expense;

            const { name, ask } = exchangeRates[currency];

            return (
              <tr key={ id }>
                <td>{tag}</td>
                <td>{description}</td>
                <td>Real</td>
                <td>{value}</td>
                <td>{name}</td>
                <td>{parseFloat(ask).toFixed(2)}</td>
                <td>{(ask * parseInt(value, 10)).toFixed(2)}</td>
                <td>{method}</td>
                <td id={ id }>
                  { this.renderDeleteBtn() }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(deleteExpenseAction(payload)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
