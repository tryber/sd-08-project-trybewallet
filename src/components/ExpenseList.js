import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { removeExpense } from '../actions';

class ExpenseList extends React.Component {
  handleDeleteItem(id) {
    const { removeExpense: removeExpenseAction } = this.props;
    removeExpenseAction(id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <section>
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
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>
                  { expense.value }
                </td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>
                  { (parseFloat(expense.exchangeRates[expense.currency].ask
                    * parseFloat(expense.value))).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button type="button" data-testid="delete-btn" onClick={ () => this.handleDeleteItem(expense.id) }>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = {
  removeExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
