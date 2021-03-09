import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SelectTag extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <select
        data-testid="tag-input"
        name="tag"
        onChange={ (e) => handleChange(e.target) }
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

SelectTag.propTypes = {
  handleChange: PropTypes.func,
}.isRequired;
