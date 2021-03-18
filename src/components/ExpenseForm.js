import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewExpense } from '../actions';
import getCurrencies from '../services';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.updateExchangeRates = this.updateExchangeRates.bind(this);
    this.inputValue = this.inputValue.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
    this.inputCurrency = this.inputCurrency.bind(this);
    this.inputMethod = this.inputMethod.bind(this);
    this.inputTag = this.inputTag.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    this.updateExchangeRates();
  }

  async updateExchangeRates() {
    const currencies = await getCurrencies();
    const { USDT, ...exchangeRates } = currencies;

    this.setState((previousState) => ({
      ...previousState,
      exchangeRates,
    }));
  }

  inputValue() {
    const { value } = this.state;
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
    const { description } = this.state;
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
    const { currency, exchangeRates } = this.state;
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
          {Object.keys(exchangeRates).map((key) => (
            <option
              key={ key }
              value={ key }
              data-testid={ key }
            >
              { key }
            </option>
          ))}
        </select>
      </label>
    );
  }

  inputMethod() {
    const { method } = this.state;
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
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  inputTag() {
    const { tag } = this.state;
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
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  handleChange({ target }) {
    this.setState((previousState) => ({
      ...previousState,
      [target.name]: target.value,
    }));
  }

  render() {
    const { saveExpense } = this.props;
    return (
      <form>
        {this.inputValue()}
        {this.inputDescription()}
        {this.inputCurrency()}
        {this.inputMethod()}
        {this.inputTag()}
        <button
          type="button"
          onClick={ () => {
            this.updateExchangeRates();
            saveExpense(this.state);
            this.setState({
              value: 0,
              description: '',
              currency: 'USD',
              method: 'Dinheiro',
              tag: 'Alimentação',
              exchangeRates: {},
            });
          } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (state) => dispatch(addNewExpense(state)),
});

ExpenseForm.propTypes = {
  saveExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpenseForm);
