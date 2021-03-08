import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SelectForm extends Component {
  render() {
    const { method, tag, handleChange } = this.props;
    return (
      <div>
        <select
          name="method"
          data-testid="method-input"
          value={ method }
          onChange={ handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </div>
    );
  }
}

SelectForm.propTypes = {
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
