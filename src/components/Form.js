import React, { Component } from 'react';
import SelectCurrency from './form/SelectCurrency';
import SelectMethod from './form/SelectMethod';
import SelectTag from './form/SelectTag';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
};

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  handleChange({ name, value }) {
    // console.log();
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description } = this.state;
    console.log(this.state);
    console.log(description);
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            value={ value }
            name="value"
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
        <SelectCurrency handleChange={ (e) => this.handleChange(e) } />
        <SelectMethod />
        <SelectTag />
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}
