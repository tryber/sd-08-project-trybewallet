import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchExchangeRatesAction from '../actions/requestExchangeRate';
import addExpenseIndexAction from '../actions/addExpenseIndex';
import addExpensesAction from '../actions/addExpenses';
import clearInputHandlerAction from '../actions/clearInputHandler';

class AddExpensesBtn extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { handlingInputs, addExpenses, clearInputHandler, resetInputs } = this.props;
    if (handlingInputs[0].exchangeRates !== prevProps.handlingInputs[0].exchangeRates
    && handlingInputs[0].id !== '') {
      addExpenses(handlingInputs);
      clearInputHandler();
      resetInputs();
    }
  }

  handleClick() {
    const {
      fetchExchangeRates,
      addExpenseIndex,
      expenses,
    } = this.props;
    const id = expenses.length;

    fetchExchangeRates();
    addExpenseIndex(id);
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
  addExpenseIndex: (id) => dispatch(addExpenseIndexAction(id)),
  addExpenses: (handlingInputs) => dispatch(addExpensesAction(handlingInputs)),
  clearInputHandler: () => dispatch(clearInputHandlerAction()),
});

AddExpensesBtn.propTypes = {
  fetchExchangeRates: PropTypes.func.isRequired,
  addExpenseIndex: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlingInputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearInputHandler: PropTypes.func.isRequired,
  resetInputs: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensesBtn);
