import React from 'react';

const FormLabel = (props) => {
  const { value, description, handleChange } = props;
  return (
    <>
      <label htmlFor="value">
        Despensa:
        <input
          type="text"
          id="value"
          data-testid="value-input"
          value={ value }
          name="value"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="description">
        Description:
        <input
          type="text"
          id="description"
          data-testid="description-input"
          value={ description }
          name="description"
          onChange={ handleChange }
        />
      </label>
    </>

  );
};

export default FormLabel;
