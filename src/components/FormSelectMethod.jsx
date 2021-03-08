import React from 'react';
import PropTypes from 'prop-types';

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

FormSelectMethod.propTypes = {
  method: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,

};
