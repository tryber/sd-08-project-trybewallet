import React from 'react';
import Input from './Input';
import { getCurrenciesAcronym } from '../services/requests';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      allCurrencies: [],
      currency: '',
      description: '',
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
        <label htmlFor="currency-input">
          Currency
          <select
            name="currency"
            id="currency-input"
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            { allCurrencies.map((oneCurrency) => (
              <option
                key={ oneCurrency }
                data-testid={ oneCurrency }
                value={ oneCurrency }
              >
                { oneCurrency }
              </option>
            ))}
          </select>
        </label>
      </form>
    );
  }
}

export default ExpenseForm;
