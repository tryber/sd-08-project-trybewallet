import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeExpense, setEditting } from '../../actions';

class CurrentExpenses extends React.Component {
  constructor() {
    super();

    this.createExpense = this.createExpense.bind(this);
  }

  createExpense(expense) {
    const { deleteExpense, editExpense } = this.props;
    const exchange = parseFloat(
      expense.exchangeRates[expense.currency].ask,
    );
    return (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>{exchange.toFixed(2)}</td>
        <td>
          {(parseInt(expense.value, 10) * exchange).toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => editExpense(expense.id) }
          >
            Editar
          </button>
        </td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => deleteExpense(expense.id) }
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
          {expenses.map(this.createExpense)}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(removeExpense(id)),
  editExpense: (id) => dispatch(setEditting(id)),
});

CurrentExpenses.propTypes = {
  expenses: PropTypes.arrayOf({}).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentExpenses);
