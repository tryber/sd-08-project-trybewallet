import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense as deleteExpenseAction } from '../actions';

class ListOfInputs extends React.Component {
  // conceito visto na w3school
  headTableListOfInputs() {
    return (
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
    );
  }

  bodyTableListOfInputs() {
    const { expenses, deleteExpense } = this.props;
    // const filterInput = currencies.filter((currency) => currency.code = expenses.currency);
    // console.log(currencies);
    // console.log(expenses);
    return expenses.map((expense) => (
      <tbody key={ expense.id }>
        <tr>
          <td>{ expense.description }</td>
          <td>{ expense.tag }</td>
          <td>{ expense.method }</td>
          <td>{ expense.value }</td>
          <td>{ expense.exchangeRates[expense.currency].name }</td>
          <td>
            { (Math.round(
              expense.exchangeRates[expense.currency].ask * 100,
            ) / 100).toFixed(2) }
          </td>
          <td>
            { Math.round(
              (expense.exchangeRates[expense.currency].ask * expense.value) * 100,
            ) / 100 }
          </td>
          <td>Real</td>
          <button type="button">Editar</button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => deleteExpense(expense.id) }
          >
            Excluir
          </button>
        </tr>
      </tbody>
    ));
  }

  render() {
    return (
      <div>
        <table>
          { this.headTableListOfInputs() }
          { this.bodyTableListOfInputs() }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOfInputs);

ListOfInputs.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      currency: PropTypes.string,
      description: PropTypes.string,
      tag: PropTypes.string,
      method: PropTypes.string,
      value: PropTypes.string,
      exchangeRates: PropTypes.shape(PropTypes.object),
    }),
  ).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};
