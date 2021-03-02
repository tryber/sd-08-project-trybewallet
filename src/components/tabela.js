import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses } from '../actions/index';
import TabelaHead from './tabelaHead';

class Tabela extends React.Component {
  constructor() {
    super();
    this.handleDelet = this.handleDelet.bind(this);
  }

  handleDelet(expenseID) {
    const { deleteExpense } = this.props;
    deleteExpense(expenseID);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <TabelaHead />
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {parseFloat(
                    expense.exchangeRates[expense.currency].ask,
                  ).toFixed(2)}
                </td>
                <td>
                  {parseFloat(
                    expense.value * expense.exchangeRates[expense.currency].ask,
                  ).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.handleDelet(expense.id) }
                  >
                    Excluir
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

Tabela.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string,
      description: PropTypes.string,
      exchangeRates: PropTypes.objectOf(PropTypes.object),
      method: PropTypes.string,
      tag: PropTypes.string,
      value: PropTypes.number,
      id: PropTypes.number,
    }),
  ).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenseID) => dispatch(deleteExpenses(expenseID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabela);
