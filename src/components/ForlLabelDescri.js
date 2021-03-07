import React from 'react';

const FormLabel = (props) => {
  const { description, handleChange } = props;
  return (
    <label htmlFor="description">
      Descrição
      <input
        type="text"
        id="description"
        data-testid="description-input"
        value={ description }
        name="description"
        onChange={ handleChange }
      />
    </label>

  );
};

export default FormLabel;
