import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delExpense as delExpenseAction } from '../actions';

class ExpensesList extends React.Component {
  render() {
    const { expenses, delExpense } = this.props;
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
              <th>Excluir</th>
            </tr>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.des}</td>
                <td>{expense.tag}</td>
                <td>{expense.met}</td>
                <td>{expense.exp}</td>
                <td>{expense.cur}</td>
                <td>{parseFloat(expense.exchange.ask).toFixed(2)}</td>
                <td>
                  {parseFloat(
                    expense.exp * expense.exchange.ask,
                  )
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => delExpense(expense.id) }
                    data-testid="delete-btn"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
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
