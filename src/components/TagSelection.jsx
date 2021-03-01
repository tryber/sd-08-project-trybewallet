import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TagSelection extends Component {
  render() {
    const { value, changeInput } = this.props;

    return (
      <label htmlFor="tag">
        Categoria:
        <select
          id="tag"
          name="tag"
          type="text"
          value={ value }
          onChange={ changeInput }
          data-testid="tag-input"
        >
          <option key="choose" value="">Escolha a categoria</option>
          <option key="grocery" value="Alimentação">Alimentação</option>
          <option key="hobby" value="Lazer">Lazer</option>
          <option key="work" value="Trabalho">Trabalho</option>
          <option key="transportation" value="Transporte">Transporte</option>
          <option key="health" value="Transporte">Saúde</option>
        </select>
      </label>
    );
  }
}
TagSelection.propTypes = {
  value: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
};

export default TagSelection;
