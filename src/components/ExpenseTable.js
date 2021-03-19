import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dispatchDelete } from '../actions';

class ExpenseTable extends React.Component {
  constructor() {
    super();
    this.renderTableHeader = this.renderTableHeader.bind(this);
  }

  convertNumber(number) {
    return parseFloat(number).toFixed(2);
  }

  renderButton(name, expense, callback) {
    return (
      <button
        type="button"
        data-testid={ `${name}-btn` }
        onClick={ () => callback(expense) }
      >
        Delete
      </button>
    );
  }

  renderTableHeader() {
    return (
      <tr>
        <th>ID</th>
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
    const { expenses, dispatchDeleteToStore } = this.props;
    return (
      <div>
        <h1>Table of Expenses</h1>
        <table>
          <tbody>
            {this.renderTableHeader(expenses)}
            {expenses.map((item) => (
              <tr key={ item.id }>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>{item.value}</td>
                <td>{item.exchangeRates[item.currency].name}</td>
                <td>
                  {this.convertNumber(item.exchangeRates[item.currency].ask)}
                </td>
                <td>
                  {this.convertNumber(item.value * item.exchangeRates[item.currency].ask)}
                </td>
                <td>Real</td>
                <td>
                  {this.renderButton('delete', item, dispatchDeleteToStore)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  dispatchDeleteToStore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteToStore: (expense) => dispatch(dispatchDelete(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
