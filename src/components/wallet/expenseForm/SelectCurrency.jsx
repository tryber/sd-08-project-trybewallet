import React from 'react';
import PropTypes from 'prop-types';

function SelectCurrency({ currencies, isFetching, handleChange, value }) {
  return (
    <>
      Moeda:
      <select
        data-testid="currency-input"
        value={ value }
        name="currency"
        onChange={ handleChange }
      >
        {
          !isFetching
        && currencies.map((current, i) => (
          <option key={ i } data-testid={ current }>{current}</option>
        ))
        }
      </select>
    </>
  );
}

SelectCurrency.propTypes = {
  currencies: PropTypes.array,
  isFetching: PropTypes.bool,
}.isRequired;

export default SelectCurrency;
