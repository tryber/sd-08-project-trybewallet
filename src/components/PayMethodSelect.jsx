import React from 'react';
import PropTypes from 'prop-types';

function PayMethodSelect({ onChange, ...rest }) {
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

PayMethodSelect.defaultProps = {
  onChange: null,
};

PayMethodSelect.propTypes = {
  onChange: PropTypes.func,
};

export default PayMethodSelect;
