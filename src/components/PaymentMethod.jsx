import React from 'react';
import PropTypes from 'prop-types';

export default function PaymentMethod({ setMethod }) {
  return (
    <select data-testid="method-input" onChange={ (e) => setMethod(e.target.value) }>
      <option>Dinheiro</option>
      <option>Cartão de crédito</option>
      <option>Cartão de débito</option>
    </select>
  );
}

PaymentMethod.propTypes = {
  setMethod: PropTypes.func.isRequired,
};
