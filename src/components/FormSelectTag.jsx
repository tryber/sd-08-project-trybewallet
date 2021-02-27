import React from 'react';

const FormSelectTag = () => (
  <>
    <span>Tag:</span>
    <select
      data-testid="tag-input"
      value={ null }
      name={ null }
      onChange={ null }
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

export default FormSelectTag;
