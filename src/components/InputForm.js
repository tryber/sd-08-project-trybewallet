import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInput from './TextInput';
import { fetchExchangeRates } from '../actions';

class InputForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      codes: [],
      currency: 'USD',
      method: '',
      tag: '',
    };

    this.onChange = this.onChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async getCurrencies() {
    const codeCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());
    delete codeCurrencies.USDT;
    // https://stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object
    const codes = Object.keys(codeCurrencies);
    this.setState({ codes });
  }

  addExpense(e) {
    e.preventDefault();
    const expense = { ...this.state };
    const { addExpenseProp } = this.props;
    delete expense.codes;
    addExpenseProp(expense);

    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
    });
  }

  currencyOptions() {
    const { codes } = this.state;
    return codes.map((code) => (
      <option
        value={ code }
        key={ code }
        data-testid={ code }
      >
        { code }
      </option>
    ));
  }

  expensesCurrencyOptions(currency) {
    return (
      <select
        type="text"
        id="currency-input"
        value={ currency }
        name="currency"
        onChange={ this.onChange }
        data-testid="currency-input"
      >
        { this.currencyOptions() }
      </select>
    );
  }

  expenseValueInput(value) {
    return (
      <TextInput
        htmlFor="value-input"
        labelText="Valor:"
        id="value-input"
        name="value"
        type="text"
        value={ value.toString() }
        onChange={ this.onChange }
        dataTestId="value-input"
        placeholder="$"
      />
    );
  }

  expenseDescriptionInput(description) {
    return (
      <TextInput
        htmlFor="description-input"
        labelText="Descrição"
        id="description-input"
        name="description"
        type="text"
        value={ description }
        onChange={ this.onChange }
        dataTestId="description-input"
        placeholder="Qual a origem da despesa"
      />
    );
  }

  paymentMethod(method) {
    return (
      <div>
        Forma de Pagamento:
        <select
          type="text"
          id="method-input"
          data-testid="method-input"
          value={ method }
          name="method"
          onChange={ this.onChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </div>
    );
  }

  expensesTag(tag) {
    return (
      <div>
        Tipo de Despesa:
        <select
          type="text"
          id="tag-input"
          data-testid="tag-input"
          value={ tag }
          name="tag"
          onChange={ this.onChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form onSubmit={ this.addExpense }>
        { this.expenseValueInput(value) }
        { this.expensesCurrencyOptions(currency) }
        <br />
        { this.expenseDescriptionInput(description) }
        { this.paymentMethod(method) }
        { this.expensesTag(tag) }
        <button type="submit">Adicionar Despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpenseProp: (expense) => dispatch(fetchExchangeRates(expense)),
});

InputForm.propTypes = {
  addExpenseProp: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(InputForm);
