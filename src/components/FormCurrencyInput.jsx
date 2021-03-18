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
        {currencyProps.map((item) => {
          if (item.name === 'Dólar Turismo') return '';
          return (
            <option value={ item.code } key={ item.code }>
              {item.code}
            </option>
          );
        })}
      </select>
    </label>
  );
}

FormCurrencyInput.propTypes = {
  currencyProps: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  expanseCurrencyProps: PropTypes.string.isRequired,
  setExpanseCurrencyFuncProps: PropTypes.func.isRequired,
};
