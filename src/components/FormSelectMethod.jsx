import React from 'react';

const FormSelectMethod = (props) => {
  const { method, handleChange } = props;
  return (
    <>
      <span>Método de pagamento:</span>
      <select
        data-testid="method-input"
        value={ method }
        name="method"
        onChange={ handleChange }
      >
        <option>
          Dinheiro
        </option>
        <option>
          Cartão de crédito
        </option>
        <option>
          Cartão de débito
        </option>
      </select>
    </>
  );
};
export default FormSelectMethod;
