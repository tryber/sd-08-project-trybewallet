import React from 'react';
import { connect } from 'react-redux';
import getCurrencies from '../services';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.updateCurrencyOptions = this.updateCurrencyOptions.bind(this);
    this.inputValue = this.inputValue.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
    this.inputCurrency = this.inputCurrency.bind(this);
    this.inputMethod = this.inputMethod.bind(this);
    this.inputTag = this.inputTag.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      newExpense: {
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
      currencyOptions: [],
    };
  }

  async componentDidMount() {
    const currencyOptions = await getCurrencies();
    this.updateCurrencyOptions(currencyOptions);
  }

  updateCurrencyOptions(currencies) {
    const currencyOptions = Object
      .keys(currencies)
      .filter((currency) => currency !== 'USDT')
      .map((currency) => currencies[currency]);
    this.setState({
      currencyOptions,
    });
  }

  inputValue() {
    const { newExpense } = this.state;
    const { value } = newExpense;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          type="number"
          name="value"
          value={ value }
          id="value-input"
          onChange={ this.handleChange }
          data-testid="value-input"
        />
      </label>
    );
  }

  inputDescription() {
    const { newExpense } = this.state;
    const { description } = newExpense;
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          type="text"
          name="description"
          value={ description }
          id="description-input"
          onChange={ this.handleChange }
          data-testid="description-input"
        />
      </label>
    );
  }

  inputCurrency() {
    const { newExpense, currencyOptions } = this.state;
    const { currency } = newExpense;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          name="currency"
          value={ currency }
          id="currency-input"
          onChange={ this.handleChange }
          data-testid="currency-input"
        >
          {currencyOptions.map((currencyOption) => (
            <option
              key={ currencyOption.code }
              value={ currencyOption.code }
            >
              { currencyOption.code }
            </option>
          ))}
        </select>
      </label>
    );
  }

  inputMethod() {
    const { newExpense } = this.state;
    const { method } = newExpense;
    return (
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          name="method"
          value={ method }
          id="method-input"
          onChange={ this.handleChange }
          data-testid="method-input"
        >
          <option value="cash">Dinheiro</option>
          <option value="credit-card">Cartão de crédito</option>
          <option value="debit-card">Cartão de débito</option>
        </select>
      </label>
    );
  }

  inputTag() {
    const { newExpense } = this.state;
    const { tag } = newExpense;
    return (
      <label htmlFor="tag-input">
        Tag:
        <select
          name="tag"
          value={ tag }
          id="tag-input"
          onChange={ this.handleChange }
          data-testid="tag-input"
        >
          <option value="food">Alimentação</option>
          <option value="leisure">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
      </label>
    );
  }

  handleChange({ target }) {
    this.setState((previousState) => ({
      newExpense: {
        ...previousState.newExpense,
        [target.name]: target.value,
      },
    }));
  }

  render() {
    return (
      <form>
        {this.inputValue()}
        {this.inputDescription()}
        {this.inputCurrency()}
        {this.inputMethod()}
        {this.inputTag()}
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

export default connect(null, null)(ExpenseForm);
