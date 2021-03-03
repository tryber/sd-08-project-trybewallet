import React from 'react';
import PropTypes from 'prop-types';

const SpendFormInput = ({ inputOnChange, value, description }) => (
  <>
    <label htmlFor="value">
      Valor:
      <input
        type="text"
        id="value"
        name="value"
        data-testid="value-input"
        onChange={ inputOnChange }
        value={ value }
      />
    </label>
    <label htmlFor="description">
      Descrição:
      <input
        type="text"
        id="description"
        name="description"
        data-testid="description-input"
        onChange={ inputOnChange }
        value={ description }
      />
    </label>
  </>
);

SpendFormInput.propTypes = {
  inputOnChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SpendFormInput;
