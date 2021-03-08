import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInput from './TextInput';

class InputForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      codes: [],
      currency: '',
    };

    this.onChange = this.onChange.bind(this);
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
    delete codeCurrencies.USDT; // https://stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object
    const codes = Object.keys(codeCurrencies);
    this.setState({ codes });
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

  render() {
    const { value, description, currency } = this.state;
    return (
      <form>
        { this.expenseValueInput(value) }
        { this.expensesCurrencyOptions(currency) }
        <br />
        { this.expenseDescriptionInput(description) }
      </form>
    );
  }
}

export default connect(null, null)(InputForm);
