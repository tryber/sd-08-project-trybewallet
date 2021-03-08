import React from 'react';
import PropTypes from 'prop-types';

const FormLabel = (props) => {
  const { value, handleChange } = props;
  return (
    <label htmlFor="value">
      Valor:
      <input
        type="number"
        id="value"
        data-testid="value-input"
        value={ value }
        name="value"
        onChange={ handleChange }
      />
    </label>

  );
};

export default FormLabel;

FormLabel.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,

};
