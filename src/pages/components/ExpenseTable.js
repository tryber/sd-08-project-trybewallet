import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, updatesExpending } from '../../actions';

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);

    this.removeExpense = this.removeExpense.bind(this);
    this.render = this.render.bind(this);
  }

  removeExpense(event, coinValue) {
    const { expenses,
      expending,
      removeExpenseAction,
      updatesExpendingAction,
    } = this.props;
    const calculatedExpense = parseFloat(
      (parseFloat(event.value) * coinValue).toFixed(2),
    );
    const valueToRemove = expending - calculatedExpense;
    updatesExpendingAction(valueToRemove);
    const newExpenses = expenses.filter((expense) => expense.id !== event.id);
    removeExpenseAction(newExpenses);
  }

  renderTr() {
    return (
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
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="expense-table">
        <tbody>
          { this.renderTr() }
          { expenses.length !== 0
            && expenses.map((expense, index) => {
              const entries = Object.entries(expense.exchangeRates);
              const moeda = entries.filter((array) => array[0] === expense.currency);
              const valorMoeda = parseFloat(moeda[0][1].ask);
              const nomeMoeda = moeda[0][1].name;
              const convertidoMoeda = parseFloat(
                (valorMoeda * parseFloat(expense.value)).toFixed(2),
              );
              return (
                <tr key={ index }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ expense.value }</td>
                  <td>{ nomeMoeda }</td>
                  <td>{ parseFloat((valorMoeda).toFixed(2)) }</td>
                  <td>{ convertidoMoeda }</td>
                  <td>Real</td>
                  <td>
                    Editar/
                    <button
                      type="button"
                      onClick={ () => this.removeExpense(expense, valorMoeda) }
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
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
  expending: state.wallet.expending,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpenseAction: (expense) => dispatch(removeExpense(expense)),
  updatesExpendingAction: (expending) => dispatch(updatesExpending(expending)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpenseAction: PropTypes.func.isRequired,
  updatesExpendingAction: PropTypes.func.isRequired,
  expending: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
