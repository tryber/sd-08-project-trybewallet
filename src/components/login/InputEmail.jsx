import React from 'react';
import PropTypes from 'prop-types';

function InputEmail({ handleChange, value }) {
  return (
    <label htmlFor="email">
      <input
        type="email"
        data-testid="email-input"
        name="email"
        value={ value.email }
        id="email"
        onChange={ handleChange }
        placeholder="email..."
      />
    </label>
  );
}

InputEmail.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
}.isRequired;

export default InputEmail;
