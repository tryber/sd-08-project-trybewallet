import PropTypes from 'prop-types';
import React from 'react';

export default function FormMethodInput({
  setPaymentMethodFuncProps,
  paymentMethodProps,
}) {
  return (
    <label htmlFor="method-input">
      Método de pagamento:
      <select
        name="method-input"
        id="method-input"
        data-testid="method-input"
        onChange={ (e) => setPaymentMethodFuncProps(e.target.value) }
        value={ paymentMethodProps }
      >
        <option value="dinheiro">Dinheiro</option>
        <option value="cartao-credito">Cartão de crédito</option>
        <option value="cartao-debito">Cartão de débito</option>
      </select>
    </label>
  );
}

FormMethodInput.propTypes = {
  paymentMethodProps: PropTypes.string.isRequired,
  setPaymentMethodFuncProps: PropTypes.func.isRequired,
};
