import React from 'react';
import PropTypes from 'prop-types';

function InputValue({ handleChange, value }) {
  return (
    <label htmlFor="values">
      Valor:
      <input
        data-testid="value-input"
        type="number"
        name="value"
        value={ value }
        min="0"
        onChange={ handleChange }
      />
    </label>
  );
}

InputValue.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.number,
}.isRequired;

export default InputValue;
