import React, { Component } from 'react';

export default class SelectTag extends Component {
  render() {
    return (
      <select
        data-testid="tag-input"
        name="tag"
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }
}
