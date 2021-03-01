import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { /* EditDelSpend, */ AddSpend } from './Index';
import del from '../images/del.png';
import { delExpense as delExpenseAction } from '../actions';

class SpendTable extends React.Component {
  constructor() {
    super();

    this.defaultExpenses = this.defaultExpenses.bind(this);
    this.renderExpenses = this.renderExpenses.bind(this);
    this.renderButtonDel = this.renderButtonDel.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, id) {
    const { delExpense } = this.props;
    e.preventDefault();
    console.log(id);
    delExpense(id);
  }

  defaultExpenses() {
    const { expenses } = this.props;
    if (expenses.length === 0) {
      return <h2>Nenhuma despesa adicionada</h2>;
    }
  }

  renderExpenses() {
    const { expenses } = this.props;
    return expenses.map((expense, index) => {
      const {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates } = expense;
      const expenseValue = parseFloat(value);
      const currencyValue = parseFloat(exchangeRates[currency].ask);
      return (
        <tr key={ index }>
          <td>{ id }</td>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{currencyValue.toFixed(2)}</td>
          <td>{(expenseValue * currencyValue).toFixed(2)}</td>
          <td>Real</td>
          <td>{ this.renderButtonDel(id) }</td>
        </tr>
      );
    });
  }

  renderButtonDel(param) {
    return (
      <form>
        <button
          type="button"
          onClick={ (e) => this.handleClick(e, param) }
        >
          <img
            data-testid="delete-btn"
            src={ del }
            alt="del"
            width="30px"
            height="30px"
          />
        </button>
      </form>
    );
  }

  render() {
    return (
      <section>
        <AddSpend />
        <table>
          <thead>
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
          </thead>
          <tbody>
            { this.renderExpenses() }
          </tbody>
        </table>
        { this.defaultExpenses() }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (expense) => dispatch(delExpenseAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpendTable);

SpendTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  delExpense: PropTypes.func.isRequired,
};

SpendTable.defaultProps = {
  expenses: [],
};
