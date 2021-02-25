import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeExpense } from '../../actions';

class CurrentExpenses extends React.Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de Pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const exchange = parseFloat(
              expense.exchangeRates[expense.currency].ask,
            ).toFixed(2);

            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{exchange}</td>
                <td>
                  {parseInt(expense.value, 10) * exchange}
                </td>
                <td>Real</td>
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
  deleteExpense: (id) => dispatch(removeExpense(id)),
});

CurrentExpenses.propTypes = {
  expenses: PropTypes.arrayOf({}).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentExpenses);
