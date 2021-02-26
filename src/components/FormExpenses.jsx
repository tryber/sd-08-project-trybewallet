import React, { Component } from 'react';
import './FormExpenses.css';

export default class FormExpenses extends Component {
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
        <label htmlFor="">
          <span>Moeda:</span>
          <select><option>BRLS</option></select>
        </label>
        <label htmlFor="">
          <span>Método de pagamento:</span>
          <select><option>asagasgas</option></select>
        </label>
        <label htmlFor="">
          <span>Tag:</span>
          <select><option>sagsasgsga</option></select>
        </label>
        <label htmlFor="">
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
