import React from 'react';

const FormSelectMethod = () => (
  <>
    <span>Método de pagamento:</span>
    <select
      data-testid="method-input"
      value={ null }
      name="method"
      onChange={ null }
    >
      <option>
        Dinheiro
      </option>
      <option>
        Cartão de crédito'
      </option>
      <option>
        Cartão de débito
      </option>
    </select>
  </>
);
export default FormSelectMethod;
