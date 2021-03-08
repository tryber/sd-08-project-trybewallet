import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenseAction } from '../actions/index';

class ExpensesTable extends React.Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>Descrição</td>
              <td>Tag</td>
              <td>Método de pagamento</td>
              <td>Valor</td>
              <td>Moeda</td>
              <td>Câmbio utilizado</td>
              <td>Valor convertido</td>
              <td>Moeda de conversão</td>
              <td>Editar/Excluir</td>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={ item.id }>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>{item.value}</td>
                <td>{item.exchangeRates[item.currency].name}</td>
                <td>{Math.round(item.exchangeRates[item.currency].ask * 100) / 100}</td>
                <td>
                  {Math.round(
                    (item.value * item.exchangeRates[item.currency].ask) * 100,
                  ) / 100}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => deleteExpense(item.id) }
                    data-testid="delete-btn"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenseID) => dispatch(deleteExpenseAction(expenseID)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
