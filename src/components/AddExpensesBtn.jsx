import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchExchangeRatesAction from '../actions/requestExchangeRate';
import addExpensesAction from '../actions/addExpenses';
import clearInputHandlerAction from '../actions/clearInputHandler';
import addExpensesIndexAction from '../actions/addExpensesIndex';
import setAdditionAction from '../actions/setAddition';
import aprovedEditionAction from '../actions/aprovedEdition';
import editExpenseAction from '../actions/editExpense';

class AddExpensesBtn extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.getLastExpenseId = this.getLastExpenseId.bind(this);
    this.handleEdition = this.handleEdition.bind(this);
  }

  componentDidUpdate() {
    const {
      handlingInputs,
      addExpenses,
      clearInputHandler,
      resetInputs,
      setAddition,
      additionToExpenses,
    } = this.props;

    if (additionToExpenses) {
      setAddition();
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

  async handleClick() {
    const {
      fetchExchangeRates,
      setAddition,
    } = this.props;

    await fetchExchangeRates();
    await this.getLastExpenseId();
    await setAddition();
  }

  handleEdition() {
    const { aprovedEdition, handlingInputs, resetInputs, editExpense } = this.props;
    const INITIAL_VALUES = [{
      id: '',
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
    }];

    aprovedEdition(handlingInputs, handlingInputs[0].id);
    resetInputs();
    editExpense(INITIAL_VALUES);
  }

  render() {
    const { editionOfExpense } = this.props;

    if (editionOfExpense) {
      return (
        <button type="button" onClick={ this.handleEdition }>Editar despesa</button>
      );
    }
    return (
      <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  handlingInputs: state.inputHandler.handlingInputs,
  additionToExpenses: state.inputHandler.additionToExpenses,
  editionOfExpense: state.inputHandler.editionOfExpense,
});

const mapDispatchToProps = (dispatch) => ({
  fetchExchangeRates: () => dispatch(fetchExchangeRatesAction()),
  addExpenses: (handlingInputs) => dispatch(addExpensesAction(handlingInputs)),
  addExpensesIndex: (newExpenseId) => dispatch(addExpensesIndexAction(newExpenseId)),
  clearInputHandler: () => dispatch(clearInputHandlerAction()),
  setAddition: () => dispatch(setAdditionAction()),
  aprovedEdition: (handlingInputs, id) => dispatch(
    aprovedEditionAction(handlingInputs, id),
  ),
  editExpense: (editionExp) => dispatch(editExpenseAction(editionExp)),
});

AddExpensesBtn.propTypes = {
  fetchExchangeRates: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  addExpensesIndex: PropTypes.func.isRequired,
  handlingInputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearInputHandler: PropTypes.func.isRequired,
  resetInputs: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAddition: PropTypes.func.isRequired,
  additionToExpenses: PropTypes.bool.isRequired,
  editionOfExpense: PropTypes.bool.isRequired,
  aprovedEdition: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensesBtn);
