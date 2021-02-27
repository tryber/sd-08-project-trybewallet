import React from 'react';

const FormLabel = () => (
  <>
    <label htmlFor="value">
      Despensa:
      <input
        type="text"
        id="value"
        data-testid="value-input"
        value={ null }
        name="value"
        onChange={ null }
      />
    </label>

    <label htmlFor="description">
      Description:
      <input
        type="text"
        id="description"
        data-testid="description-input"
        value={ null }
        name="description"
        onChange={ null }
      />
    </label>
  </>
);

export default FormLabel;
