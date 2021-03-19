import React, { Component } from 'react';

export default class Form extends Component {
  render() {
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input type="text" name="value" data-testid="value-input" />
        </label>
        <label htmlFor="description">
          Description:
          <input
            type="text"
            name="description"
            data-testid="description-input"
          />
        </label>
      </form>
    );
  }
}
