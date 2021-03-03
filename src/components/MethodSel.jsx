import React from 'react';
import PropTypes from 'prop-types';

function MethodSel({ onChange, ...rest }) {
  return (
    <select
      name="method"
      role="combobox"
      data-testid="method-input"
      onChange={ onChange }
      { ...rest }
    >
      <option value="Dinheiro">Dinheiro</option>
      <option value="Cartão de crédito">Cartão de crédito</option>
      <option value="Cartão de débito">Cartão de débito</option>
    </select>
  );
}

MethodSel.defaultProps = {
  onChange: null,
};

MethodSel.propTypes = {
  onChange: PropTypes.func,
};
export default MethodSel;
