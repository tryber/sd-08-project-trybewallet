import React from 'react';

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
