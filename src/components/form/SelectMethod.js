import React, { Component } from 'react';

export default class SelectMethod extends Component {
  render() {
    return (
      <select
        data-testid="method-input"
        name="method"
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }
}
