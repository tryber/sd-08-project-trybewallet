import React from 'react';

export default class SelectCategorias extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="tag-input">
          Categoria:
          <select
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}
