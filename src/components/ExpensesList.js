import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delExpense as delExpenseAction } from '../actions';

class ExpensesList extends React.Component {
  deleteClick(id) {
    const { delExpense } = this.props;
    delExpense(id);
  }

  tableGenerator() {
    const { expenses } = this.props;
    return (
      <>
        {expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{expense.value}</td>
            <td>{(expense.exchangeRates[expense.currency]).name}</td>
            <td>
              {parseFloat((expense.exchangeRates[expense.currency]).ask).toFixed(2)}
            </td>
            <td>
              {parseFloat(expense.value * (expense
                .exchangeRates[expense.currency]).ask).toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                onClick={ () => this.deleteClick(expense.id) }
                data-testid="delete-btn"
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </>
    );
  }

  render() {
    return (
      <section>
        <h2>Lista de Despesas</h2>
        <table>
          <tbody>
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
            {this.tableGenerator()}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (item) => dispatch(delExpenseAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);

ExpensesList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number,
      exp: PropTypes.string,
      des: PropTypes.string,
      cur: PropTypes.string,
      met: PropTypes.string,
      tag: PropTypes.string,
      exc: PropTypes.string,
      vex: PropTypes.string,
      cex: PropTypes.string,
    },
  )).isRequired,
  delExpense: PropTypes.func.isRequired,
};
