import React from 'react';
import PropTypes from 'prop-types';

function SelectMethod({ handleChange, value }) {
  const arrayMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
  return (
    <>
      Metodo:
      <select
        data-testid="method-input"
        value={ value }
        name="method"
        onChange={ handleChange }
      >
        {arrayMethods.map((method) => (
          <option
            key={ method }
            value={ method }
          >
            {method}
          </option>
        ))}
      </select>
    </>
  );
}

SelectMethod.propTypes = {
  handleChange: PropTypes.func,
}.isRequired;

export default SelectMethod;
