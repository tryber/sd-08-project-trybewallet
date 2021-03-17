import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesValues as fetchCurrencies,
  saveExpenseUser as addExpense } from '../actions';
import getCurrenciesValues from '../services/currenciesValuesApi';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  id: 0,
  tag: 'Alimentação',
};
class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = { ...INITIAL_STATE };
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

  async handleClick() {
    const { id } = this.state;
    const { saveExpenseUser } = this.props;
    const exchangeRates = await getCurrenciesValues();
    const expenses = {
      ...this.state,
      exchangeRates,
    };
    saveExpenseUser(expenses);
    this.setState({
      ...INITIAL_STATE,
      id: id + 1,
    });
  }

  addExpenseButton() {
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
    const { currenciesState } = this.props;
    return (
      <div>
        {this.renderInput('value', 'Valor', 'number', value)}
        {this.renderInput('description', 'Descrição', 'text', description)}
        { this.renderSelectCurrencies(currenciesState, currency)}
        {this.renderSelect('method', 'Meio de Pagamento', method, paymentOptions)}
        {this.renderSelect('tag', 'Tag', tag, tags)}
        {this.addExpenseButton()}
      </div>

    );
  }
}

ExpenseForm.propTypes = {
  currenciesState: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCurrenciesValues: PropTypes.func.isRequired,
  saveExpenseUser: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesValues: () => dispatch(fetchCurrencies()),
  saveExpenseUser: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
