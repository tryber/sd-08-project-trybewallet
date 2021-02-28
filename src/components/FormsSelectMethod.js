import React from 'react';
import PropTypes from 'prop-types';

const FormsSelectMethod = (props) => {
  const { handleInput } = props;
  return (
    <label htmlFor="payment-method">
      Payment method
      <select
        name="payment-method"
        id="payment-method"
        data-testid="method-input"
        onChange={ (e) => handleInput('method', e.target.value) }
      >
        <option
          value="Dinheiro"
          name="payment-method"
          id="payment-method"
        >
          Dinheiro
        </option>
        <option
          value="Cartão de crédito"
          name="payment-method"
          id="payment-method"
        >
          Cartão de crédito
        </option>
        <option
          value="Cartão de débito"
          name="payment-method"
          id="payment-method"
        >
          Cartão de débito
        </option>
      </select>
    </label>
  );
};

FormsSelectMethod.propTypes = {
  handleInput: PropTypes.func,
}.isRequired;

export default FormsSelectMethod;
