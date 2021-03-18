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
      <div key={ id } className="content">
        <div role="cell">{description}</div>
        <div role="cell">{tag}</div>
        <div role="cell">{method}</div>
        <div role="cell">{value}</div>
        <div role="cell">{name}</div>
        <div role="cell">{parseFloat(ask).toFixed(2)}</div>
        <div role="cell">{(value * ask).toFixed(2)}</div>
        <div role="cell">Real</div>
        <div>
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
        </div>
      </div>
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
