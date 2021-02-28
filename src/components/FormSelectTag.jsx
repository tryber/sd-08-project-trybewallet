import React from 'react';

const FormSelectTag = (props) => {
  const { tag, handleChange } = props;
  return (
    <>
      <span>Tag:</span>
      <select
        data-testid="tag-input"
        value={ tag }
        name="tag"
        onChange={ handleChange }
      >
        <option>
          Alimentação
        </option>
        <option>
          Lazer
        </option>
        <option>
          Trabalho
        </option>
        <option>
          Transporte
        </option>
        <option>
          Saúde
        </option>
      </select>
    </>
  );
};
export default FormSelectTag;
