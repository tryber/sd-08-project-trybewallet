import React from 'react';
import PropTypes from 'prop-types';

function TagSelect({ onChange, ...rest }) {
  return (
    <label htmlFor="tag">
      Categoria da Despesa:
      <select
        name="tag"
        data-testid="tag-input"
        role="combobox"
        onChange={ onChange }
        { ...rest }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    </label>
  );
}

TagSelect.defaultProps = {
  onChange: null,
};

TagSelect.propTypes = {
  onChange: PropTypes.func,
};

export default TagSelect;
