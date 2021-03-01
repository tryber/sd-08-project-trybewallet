import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchExchangeRatesAction from '../actions/requestExchangeRate';
import addExpensesAction from '../actions/addExpenses';
import clearInputHandlerAction from '../actions/clearInputHandler';
import addExpensesIndexAction from '../actions/addExpensesIndex';

class AddExpensesBtn extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.getLastExpenseId = this.getLastExpenseId.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { handlingInputs, addExpenses, clearInputHandler, resetInputs } = this.props;
    if (handlingInputs[0].exchangeRates !== prevProps.handlingInputs[0].exchangeRates
      && handlingInputs[0].value !== '') {
      addExpenses(handlingInputs);
      clearInputHandler();
      resetInputs();
    }
  }

  getLastExpenseId() {
    const { expenses, addExpensesIndex } = this.props;
    let newExpenseId = {};
    if (expenses.length > 0) {
      const { id } = expenses[expenses.length - 1];
      newExpenseId = { id: id + 1 };
    } else {
      newExpenseId = { id: 0 };
    }
    addExpensesIndex(newExpenseId);
  }

  handleClick() {
    const {
      fetchExchangeRates,
    } = this.props;

    fetchExchangeRates();
    this.getLastExpenseId();
  }

  render() {
    return (
      <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  handlingInputs: state.inputHandler.handlingInputs,
});

const mapDispatchToProps = (dispatch) => ({
  fetchExchangeRates: () => dispatch(fetchExchangeRatesAction()),
  addExpenses: (handlingInputs) => dispatch(addExpensesAction(handlingInputs)),
  addExpensesIndex: (newExpenseId) => dispatch(addExpensesIndexAction(newExpenseId)),
  clearInputHandler: () => dispatch(clearInputHandlerAction()),
});

AddExpensesBtn.propTypes = {
  fetchExchangeRates: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  addExpensesIndex: PropTypes.func.isRequired,
  handlingInputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearInputHandler: PropTypes.func.isRequired,
  resetInputs: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensesBtn);
