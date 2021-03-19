import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
      currency: 'USD',
      description: '',
      method: '',
      tag: '',
      value: '',
      id: 0,
      exchangeRates: [],
    };

    this.inputValues = this.inputValues.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputCurrency = this.inputCurrency.bind(this);
    this.inputPayment = this.inputPayment.bind(this);
    this.inputExpenseCategory = this.inputExpenseCategory.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.getApi = this.getApi.bind(this);
    this.totalValue = this.totalValue.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const data = await this.getApi();
    const objectKeys = Object.keys(data);
    const currencies = objectKeys.filter((item) => item !== 'USDT');

    this.setState({
      currencies,
      exchangeRates: data,
    });
  }

  async getApi() {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const fetchApi = await fetch(endpoint);
    const data = await fetchApi.json();
    return data;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  inputValues() {
    const { value } = this.state;
    return (
      <div>
        <input
          type="text"
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ (event) => this.handleChange(event) }
        />
        <textarea
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ (event) => this.handleChange(event) }
        />
      </div>
    );
  }

  inputCurrency() {
    const { currencies } = this.state;
    return (
      <select
        data-testid="currency-input"
        name="currency"
        onChange={ (event) => this.handleChange(event) }
      >
        {currencies.map((cur) => (
          <option
            key={ cur }
            value={ cur }
            data-testid={ cur }
          >
            { cur }
          </option>
        ))}
      </select>
    );
  }

  inputPayment() {
    const paymentMethods = [
      'Dinheiro', 'Cartão de crédito', 'Cartão de débito',
    ];
    return (
      <select
        data-testid="method-input"
        name="method"
        onChange={ (event) => this.handleChange(event) }
      >
        {paymentMethods.map((method) => (
          <option
            key={ method }
            value={ method }
          >
            { method }
          </option>
        ))}
      </select>
    );
  }

  inputExpenseCategory() {
    const categories = [
      'Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde',
    ];
    return (
      <select
        data-testid="tag-input"
        name="tag"
        onChange={ (event) => this.handleChange(event) }
      >
        {categories.map((tag) => (
          <option
            key={ tag }
            value={ tag }
          >
            { tag }
          </option>
        ))}
      </select>
    );
  }

  handleClick() {
    const {
      currency,
      description,
      method,
      tag,
      value,
      exchangeRates,
    } = this.state;
    let { id } = this.state;
    const { addExpense } = this.props;
    this.getCurrencies();
    const object = {
      currency,
      description,
      method,
      tag,
      value,
      exchangeRates,
      id,
    };
    id += 1;
    addExpense(object);
    this.setState({
      id,
      value: '',
    }, this.totalValue());
  }

  totalValue() {
    const { expenses, sendTotalValue } = this.props;
    let count = 0;
    const arrayValues = expenses.map((item) => (
      item.value * (item.exchangeRates[item.currency].ask)
    ));
    for (let i = 0; i < arrayValues.length; i += 1) {
      count += arrayValues[i];
    }
    sendTotalValue(count);
  }

  render() {
    this.totalValue();
    return (
      <div>
        { this.inputValues() }
        { this.inputCurrency() }
        { this.inputPayment() }
        { this.inputExpenseCategory() }
        <button
          type="button"
          onClick={ () => this.handleClick() }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  sendTotalValue: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch({ type: 'ADD_EXPENSE', expense }),
  sendTotalValue: (value) => dispatch({ type: 'TOTAL_VALUE', value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
