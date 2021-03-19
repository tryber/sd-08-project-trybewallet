import PropTypes from 'prop-types';
import React from 'react';

export default function FormCurrencyInput({
  setExpanseCurrencyFuncProps,
  expanseCurrencyProps,
  currencyProps,
}) {
  return (
    <label htmlFor="currency-input">
      Moeda:
      <select
        name="currency-input"
        id="currency-input"
        data-testid="currency-input"
        onChange={ (e) => setExpanseCurrencyFuncProps(e.target.value) }
        value={ expanseCurrencyProps }
      >
        {currencyProps.length && currencyProps.map((item) => (
          <option data-testid={ item } value={ item } key={ item }>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

FormCurrencyInput.propTypes = {
  currencyProps: PropTypes.shape({
    length: PropTypes.func,
    map: PropTypes.func,
  }).isRequired,
  expanseCurrencyProps: PropTypes.string.isRequired,
  setExpanseCurrencyFuncProps: PropTypes.func.isRequired,
};
