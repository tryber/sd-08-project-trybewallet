import React from 'react';
import PropTypes from 'prop-types';

function InputDescription({ handleChange, value }) {
  return (
    <label htmlFor="description">
      Descrição:
      <input
        data-testid="description-input"
        type="text"
        name="description"
        onChange={ handleChange }
        value={ value }
      />
    </label>
  );
}

InputDescription.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.number,
}.isRequired;

export default InputDescription;
