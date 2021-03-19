import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Expenses extends React.Component {
  constructor() {
    super();
    this.renderExpenses = this.renderExpenses.bind(this);
  }

  renderExpenses(expense) {
    const { deleteExpense } = this.props;
    const { description, tag, method, value, exchangeRates, currency } = expense;
    const getCurrency = Object.values(exchangeRates);
    const findCurrency = getCurrency.find((item) => item.code === currency);
    const { name, ask } = findCurrency;
    return (
      <div className="expenses-itens">
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
            onClick={ () => deleteExpense(expense) }
            data-testid="delete-btn"
          >
            Delete
          </button>
          <button type="button" data-testid="edit-btn">Edit</button>
        </div>
      </div>
    );
  }

  render() {
    const { expenses } = this.props;

    return (
      <div>
        {expenses.length > 0
          ? expenses
            .map((expense) => this.renderExpenses(expense))
          : 'Ops, não temos nenhum valor'}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(actions.deleteExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);

Expenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};
