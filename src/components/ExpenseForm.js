import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrenciesValues as fetchCurrencies,
  saveExpenseUser as addExpense,
  editExpenseUser as editExpense,
  updateExpenseUser as updateExpense,
} from '../actions';

import getCurrenciesValues from '../services/currenciesValuesApi';

const initialState = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  id: 0,
  tag: 'Alimentação',
};

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    const { editState } = this.props;
    this.state = { ...editState };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchCurrenciesValues } = this.props;
    fetchCurrenciesValues();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() { // esse ten que variar
    const { id } = this.state;
    const { saveExpenseUser, editExpenseUser, edit, updateExpenseUser } = this.props;
    const exchangeRates = await getCurrenciesValues();
    const expenses = {
      ...this.state,
      exchangeRates,
    };
    if (edit[1] === 1) {
      editExpenseUser(0, 0);
      updateExpenseUser(expenses);
    } else {
      saveExpenseUser(expenses);

      this.setState({
        ...initialState,
        id: id + 1,
      });
    }
  }

  addExpenseButton() { // esse tem que variar
    return (
      <button
        type="button"
        onClick={ this.handleClick }
        className="expense-btn add-expense"
      >
        Adicionar despesa
      </button>
    );
  }

  renderInput(name, label, type, value) {
    return (
      <label htmlFor={ `${name}-input` }>
        {`${label}: `}
        <input
          id={ `${name}-input` }
          type={ type }
          name={ `${name}` }
          data-testid={ `${name}-input` }
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderSelectCurrencies(currenciesState, value) {
    return (
      <select
        data-testid="currency-input"
        onChange={ this.handleChange }
        name="currency"
        value={ value }
      >
        { currenciesState.map((element, index) => {
          if (element.codein !== 'BRLT') {
            return (
              <option
                key={ index }
                value={ element.code }
                data-testid={ `${element.code}` }
              >
                {element.code}

              </option>
            );
          }
          return '';
        })}
      </select>
    );
  }

  renderSelect(name, label, value, options) {
    return (
      <label htmlFor={ `${name}-input` }>
        {`${label}: `}
        <select
          id={ `${name}-input` }
          name={ name }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
          value={ value }
        >
          {options.map((option, index) => (
            <option key={ index }>{option}</option>
          ))}
        </select>
      </label>
    );
  }

  render() {
    const paymentOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { value, description, currency, method, tag } = this.state;
    const { stateWallet } = this.props;
    return (
      <div>
        {this.renderInput('value', 'Valor', 'number', value)}
        {this.renderInput('description', 'Descrição', 'text', description)}
        { this.renderSelectCurrencies(stateWallet.currencies, currency)}
        {this.renderSelect('method', 'Meio de Pagamento', method, paymentOptions)}
        {this.renderSelect('tag', 'Tag', tag, tags)}
        {this.addExpenseButton()}
      </div>

    );
  }
}

ExpenseForm.propTypes = {
  fetchCurrenciesValues: PropTypes.func.isRequired,
  editExpenseUser: PropTypes.func.isRequired,
  saveExpenseUser: PropTypes.func.isRequired,
  updateExpenseUser: PropTypes.func.isRequired,
  edit: PropTypes.arrayOf(PropTypes.object).isRequired,
  stateWallet: PropTypes.arrayOf(PropTypes.object).isRequired,
  editState: PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,

  }).isRequired,
};

const mapStateToProps = (state) => ({
  stateWallet: state.wallet,
  edit: state.wallet.editExpense,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesValues: () => dispatch(fetchCurrencies()),
  saveExpenseUser: (expense) => dispatch(addExpense(expense)),
  editExpenseUser: (...args) => dispatch(editExpense(...args)),
  updateExpenseUser: (expense) => dispatch(updateExpense(expense)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
