import React from 'react';
import PropTypes from 'prop-types';

class SelectTag extends React.Component {
  render() {
    const { onChange } = this.props;
    return (
      <label htmlFor="tag">
        <select
          data-testid="tag-input"
          id="tag"
          onChange={ onChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saude">Saúde</option>
        </select>
      </label>
    );
  }
}

SelectTag.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SelectTag;
