import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TagSelection extends Component {
  render() {
    const { value, changeInput } = this.props;

    return (
      <label htmlFor="tag">
        Categoria:
        <select
          name="tag"
          type="text"
          value={ value }
          onChange={ changeInput }
          data-testid="tag-input"
        >
          <option key="choose" value="">Escolha a categoria</option>
          <option key="grocery" value="grocery">Alimentação</option>
          <option key="hobby" value="hobby">Lazer</option>
          <option key="work" value="work">Trabalho</option>
          <option key="transportation" value="transportation">Transporte</option>
          <option key="health" value="health">Saúde</option>
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
