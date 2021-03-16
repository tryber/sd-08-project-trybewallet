import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import Select from './Select';
import { getCurrenciesAcronym, fetchCurrencies } from '../services/requests';
import { addExpense, editExpense, setCurrencies } from '../actions/walletActions';
import { ALL_METHODS, ALL_TAGS } from '../helpers/constants';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: '0',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { setCurrenciesToRedux } = this.props;
    await getCurrenciesAcronym()
      .then((currencies) => setCurrenciesToRedux(currencies));
  }

  async getCurrenciesInfo() {
    return fetchCurrencies();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const NONEXISTENT_INDEX = -1;

    const { addNewExpense, calcTotal, expenses } = this.props;
    const newExpense = { ...this.state };
    const exchangeRates = await fetchCurrencies();

    const id = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 0;
    newExpense.id = id;
    newExpense.exchangeRates = exchangeRates;

    addNewExpense(newExpense);
    calcTotal(NONEXISTENT_INDEX);

    this.setState({
      // currency: 'USD',
      description: '',
      // method: 'Dinheiro',
      // tag: 'Alimentação',
      value: '0',
    });
  }

  handleEditSubmit(expense) {
    const { calcTotal, editRow, updateExpense } = this.props;
    // console.log(expense);
    const editedExpense = { ...expense, ...this.state };
    // console.log(editedExpense);
    const NONEXISTENT_INDEX = -1;

    updateExpense(editedExpense);
    editRow({ id: NONEXISTENT_INDEX });
    this.setState({
      description: '',
      value: '0',
    });
    calcTotal(NONEXISTENT_INDEX);
  }

  showAddButton() {
    return (
      <button
        type="submit"
        onClick={ this.handleSubmit }
      >
        Adicionar despesa
      </button>
    );
  }

  showEditButton(expense) {
    return (
      <button
        type="submit"
        onClick={ (event) => {
          event.preventDefault();
          this.handleEditSubmit(expense);
        } }
      >
        Editar despesa
      </button>
    );
  }

  render() {
    const { description, value } = this.state;
    const { currencies, editing } = this.props;
    const NONEXISTENT_INDEX = -1;

    return (
      <form>
        <Input
          name="value"
          type="number"
          onChange={ this.handleChange }
          value={ value }
        />
        <Input
          name="description"
          type="text"
          onChange={ this.handleChange }
          value={ description }
        />
        <Select
          name="currency"
          onChange={ this.handleChange }
          options={ currencies }
        />
        <Select
          name="method"
          onChange={ this.handleChange }
          options={ ALL_METHODS }
        />
        <Select
          name="tag"
          onChange={ this.handleChange }
          options={ ALL_TAGS }
        />
        { editing.id === NONEXISTENT_INDEX
          ? this.showAddButton()
          : this.showEditButton(editing) }
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  addNewExpense: PropTypes.func.isRequired,
  calcTotal: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editing: PropTypes.shape({ id: PropTypes.number }).isRequired,
  editRow: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  setCurrenciesToRedux: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addNewExpense: (expense) => dispatch(addExpense(expense)),
  setCurrenciesToRedux: (currencies) => dispatch(setCurrencies(currencies)),
  updateExpense: (expense) => dispatch(editExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
