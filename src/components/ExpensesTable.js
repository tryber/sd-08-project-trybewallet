import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';
import julius from '../img/julius.jpeg';

class ExpensesTable extends Component {
  constructor() {
    super();

    this.getExpenses = this.getExpenses.bind(this);
  }

  getExpenses(expense) {
    const {
      description,
      value,
      currency,
      method,
      tag,
      exchangeRates,
      id,
    } = expense;
    const nameCurrency = Object.values(exchangeRates).find(
      (item) => item.code === currency,
    );
    const { name, ask } = nameCurrency;
    const { deleteExpenses, editExpense } = this.props;
    return (
      <tr key={ id } className="content">
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{name}</td>
        <td>{parseFloat(ask).toFixed(2)}</td>
        <td>{(value * ask).toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => deleteExpenses(expense) }
          >
            Delete
          </button>
          <button
            id={ id }
            type="button"
            data-testid="edit-btn"
            onClick={ editExpense }
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <div className="header-table">
          <div>Descrição</div>
          <div>Tag</div>
          <div>Método de pagamento</div>
          <div>Valor</div>
          <div>Moeda</div>
          <div>Câmbio utilizado</div>
          <div>Valor convertido</div>
          <div>Moeda de conversão</div>
          <div>Editar/Excluir</div>
        </div>
        <div className="content-table">
          {expenses.length === 0 ? (
            <p className="message">
              <span>Se eu não comprar nada, o desconto é maior!</span>
              <img className="julius" src={ julius } alt="Wallet Logo" />
            </p>
          ) : (
            expenses.map((expense) => this.getExpenses(expense))
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpenses: (expense) => dispatch(deleteExpense(expense)),
});

export default connect(null, mapDispatchToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenses: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};
