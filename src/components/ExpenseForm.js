import React from 'react';
import Input from './Input';
import Select from './Select';

import { getCurrenciesAcronym } from '../services/requests';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      allCurrencies: [],
      currency: '',
      description: '',
      method: '',
      value: '0',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await getCurrenciesAcronym()
      .then((currencies) => this.setState({
        allCurrencies: currencies,
      }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { allCurrencies, description, value } = this.state;
    const allMethods = ['cash', 'debitCard', 'creditCard'];
    const allMethodsName = ['Dinheiro', 'Cartão de débito', 'Cartão de crédito'];

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
          options={ allCurrencies }
          optionsName={ allCurrencies }
        />
        <Select
          name="method"
          onChange={ this.handleChange }
          options={ allMethods }
          optionsName={ allMethodsName }
        />
      </form>
    );
  }
}

export default ExpenseForm;
