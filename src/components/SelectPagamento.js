import React, { Component } from 'react';

export default class componentName extends Component {
  render() {
    return (
      <div>
        <label htmlFor="method-input">
          Método de Pagamento:
          <select
            data-testid="method-input"
            // onChange={ (event) => handleChange(event) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }
}
