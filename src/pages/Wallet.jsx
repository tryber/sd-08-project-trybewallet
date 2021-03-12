import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import ExpensesForm from '../Components/FormExpenses';
import fetchCurrency from '../API';
import {
  fetchCurrencyAction,
  deleteExpense,
  editExpenses,
  thisEditing,
} from '../actions';
import Table from '../Components/Table';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
      arrayCurrencyFiltered: [],
      totalExpenses: 0,
    };
    this.fetchCurrencyType = this.fetchCurrencyType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonEditarTab = this.buttonEditarTab.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencyType();
  }

  handleChange({ target }) {
    const { expense } = this.state;
    const { value, name } = target;
    this.setState({
      expense: { ...expense, [name]: value },
    });
  }

  async fetchCurrencyType() {
    const allCurrency = await fetchCurrency();
    const arrayCurrency = Object.keys(allCurrency);
    const arrayCurrencyFiltered = arrayCurrency.filter((currency) => currency !== 'USDT');
    this.setState({
      arrayCurrencyFiltered,
    });
  }

  calcExpenses(prevProps) {
    console.log(prevProps);
    const { expenses } = this.props;
    if (prevProps && prevProps.expenses !== expenses) {
      const totalExpenses = expenses
        .reduce((acc, curr) => (
          acc + (curr.value * curr.exchangeRates[curr.currency].ask)
        ), 0);
      this.setState({
        totalExpenses,
      });
    }
  }

  eraseState() {
    this.setState((prevState) => ({
      ...prevState,
      expense: {
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    }));
  }

  handleSubmit() {
    const { expense } = this.state;
    const {
      addExpenseProps,
      isEditing,
      expenses,
      editing,
      editExpenseProps,
    } = this.props;
    if (!isEditing) {
      addExpenseProps(expense)
        .then(() => this.calcExpenses())
        .then(() => this.eraseState());
    } else {
      const expenseID = expense.id;
      const mapExpenses = expenses.map((element) => {
        if (element.id === expenseID) {
          return expense;
        }
        return element;
      });
      editExpenseProps(mapExpenses);
    }
    editing(false);
    this.eraseState();
  }

  buttonEditarTab(expense) {
    const { editing } = this.props;
    editing(true);
    this.setState({
      expense,
    });
  }

  render() {
    const { user, expenses, deleteExpenseProps } = this.props;
    const { arrayCurrencyFiltered, totalExpenses } = this.state;
    return (
      <div>
        <Header
          user={ user }
          totalExpenses={ totalExpenses }
        />
        <ExpensesForm
          state={ this.state }
          arrayCurrencyFiltered={ arrayCurrencyFiltered }
          handleChange={ this.handleChange }
          handleSubmit={ this.handleSubmit }
          handleChangeExpense={ this.handleChangeExpense }
        />
        <Table
          expenses={ expenses }
          deleteExpenseProps={ deleteExpenseProps }
          buttonEditarTab={ this.buttonEditarTab }
          handleChangeExpense={ this.handleChangeExpense }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseProps: (expense) => dispatch(fetchCurrencyAction(expense)),
  deleteExpenseProps: (id) => dispatch(deleteExpense(id)),
  editExpenseProps: (expenses) => dispatch(editExpenses(expenses)),
  editing: (change) => dispatch(thisEditing(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpenseProps: PropTypes.func.isRequired,
  deleteExpenseProps: PropTypes.func.isRequired,
  editExpenseProps: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editing: PropTypes.func.isRequired,
};
