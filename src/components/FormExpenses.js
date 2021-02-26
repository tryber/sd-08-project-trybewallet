import React, { Component } from 'react';
import selectFields from '../Database/selectFields';
import './FormExpenses.css';

export default class FormExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formControl: {
        value: '0',
        currency: '',
        payMethod: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      },
    };
    this.renderSelectF = this.renderSelectF.bind(this);
    this.renderListOptions = this.renderListOptions.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(type, { value }) {
    this.setState((p) => ({
      formControl: { ...p.formControl, [type]: value },
    }));
  }

  renderListOptions(arraySelect) {
    return arraySelect.map((e) => (
      <option key={ e } value={ e }>{e}</option>
    ));
  }

  renderSelectF() {
    const { payMethods, payTags } = selectFields;
    const { formControl: { currency, payMethod, tag } } = this.state;
    return (
      <div>
        <label htmlFor="currencyInput">
          <span>Moeda:</span>
          <select
            id="currencyInput"
            name="currencyInput"
            data-testid="currency-input"
            value={ currency }
            onChange={ ({ target }) => this.handleInput('currency', target) }
          >
            BRL
          </select>
        </label>
        <label htmlFor="methodInput">
          <span>Método de pagamento:</span>
          <select
            id="methodInput"
            name="methodInput"
            data-testid="method-input"
            value={ payMethod }
            onChange={ ({ target }) => this.handleInput('payMethod', target) }
          >
            {this.renderListOptions(payMethods)}
          </select>
        </label>
        <label htmlFor="tagInput">
          <span>Tag:</span>
          <select
            id="tagInput"
            name="tagInput"
            data-testid="tag-input"
            value={ tag }
            onChange={ ({ target }) => this.handleInput('tag', target) }
          >
            {this.renderListOptions(payTags)}
          </select>
        </label>
      </div>
    );
  }

  render() {
    const { formControl: { value, description } } = this.state;
    return (
      <form className="form-expenses">
        <label htmlFor="valueInput">
          <span>Valor:</span>
          <input
            type="number"
            name="valueInput"
            id="valueInput"
            data-testid="value-input"
            value={ value }
            onChange={ ({ target }) => this.handleInput('value', target) }
          />
        </label>
        {this.renderSelectF()}
        <label htmlFor="descriptionInput">
          <span>Descrição:</span>
          <textarea
            name="descriptionInput"
            id="descriptionInput"
            cols="20"
            rows="2"
            data-testid="description-input"
            value={ description }
            onChange={ ({ target }) => this.handleInput('description', target) }
          />
        </label>
        <button type="button">Adicionar Despesa</button>
      </form>
    );
  }
}
