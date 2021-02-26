import React, { Component } from 'react';
import './FormExpenses.css';

export default class FormExpenses extends Component {
  constructor(props) {
    super(props);
    this.renderSelectF = this.renderSelectF.bind(this);
  }

  renderSelectF() {
    return (
      <div>
        <label htmlFor="currencyInput">
          <span>Moeda:</span>
          <select
            id="currencyInput"
            name="currencyInput"
            data-testid="currency-input"
          >
            <option>BRLS</option>
          </select>
        </label>
        <label htmlFor="methodInput">
          <span>Método de pagamento:</span>
          <select
            id="methodInput"
            name="methodInput"
            data-testid="method-input"
          >
            <option>asagasgas</option>
          </select>
        </label>
        <label htmlFor="tagInput">
          <span>Tag:</span>
          <select
            id="tagInput"
            name="tagInput"
            data-testid="tag-input"
          >
            <option>sagsasgsga</option>
          </select>
        </label>
      </div>
    );
  }

  render() {
    return (
      <form className="form-expenses">
        <label htmlFor="valueInput">
          <span>Valor:</span>
          <input
            type="number"
            name="valueInput"
            id="valueInput"
            data-testid="value-input"
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
          />
        </label>
        <button type="button">Adicionar Despesa</button>
      </form>
    );
  }
}
