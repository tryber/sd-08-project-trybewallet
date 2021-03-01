import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteExpense as deleteExpenseAction } from '../actions';

class Table extends React.Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    return (
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
          {expenses.map((expense, index) => {
            const { description, tag, method, value, currency, exchangeRates } = expense;
            const { name, ask } = exchangeRates[currency];
            return (
              <tr key={ index }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{name}</td>
                <td>{parseFloat(ask).toFixed(2)}</td>
                <td>{(ask * parseInt(value, 10)).toFixed(2)}</td>
                <td>Real</td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => deleteExpense(expense) }
                >
                  Excluir
                </button>
              </tr>
            );
          })}
        </tbody>

      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (totalExpense) => dispatch(deleteExpenseAction(totalExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
