import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Creators } from '../actions/wallet.action';

class ExpensesTable extends Component {
  renderTableThead() {
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

  render() {
    const { expenses, removeExpenseButton } = this.props;
    return (
      <fieldset>
        <section>
          <table>
            {this.renderTableThead()}
            <tbody>
              {expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ expense.value }</td>
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
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => removeExpenseButton(expense.id) }
                      className="delete-button"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      className="edit-button"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </fieldset>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpenseButton: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

function mapDispatchToProps(dispatch) {
  return {
    removeExpenseButton: bindActionCreators(Creators.removeExpense, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
