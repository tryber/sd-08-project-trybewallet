import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getCurrencyList from '../services/getCurrencyList';

function CurrencySelect({ onChange, ...rest }) {
  const [currList, setCurrList] = useState(null);
  const fetchCurrList = async () => {
    if (!currList) {
      const list = await getCurrencyList();
      setCurrList(list);
    }
  };
  fetchCurrList();
  return (
    <label htmlFor="currency">
      Moeda:
      <select name="currency" data-testid="currency-input" onChange={ onChange } { ...rest }>
        {currList && currList.map((curr) => <option key={ curr } data-testid={ curr } value={ curr }>{curr}</option>)}
      </select>
    </label>
  );
}

CurrencySelect.defaultProps = {
  onChange: null,
};

CurrencySelect.propTypes = {
  onChange: PropTypes.func,
};

export default CurrencySelect;
