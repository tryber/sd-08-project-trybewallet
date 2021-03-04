import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import getCurrencyList from '../services/getCurrencyList';
import * as actions from '../actions/awderqwe';

function CurrencySelect({ onChange, ...rest }) {
  const currList = useSelector((state) => state.wallet.currencies);
  const dispatch = useDispatch();
  const fetchCurrList = async () => {
    if (currList.length === 0) {
      const list = await getCurrencyList();
      dispatch(actions.addCurrency(list));
    }
  };
  fetchCurrList();
  return (
    <select
      name="currency"
      data-testid="currency-input"
      role="combobox"
      onChange={ onChange }
      { ...rest }
    >
      {currList && currList.map((curr) => (
        <option
          key={ curr }
          data-testid={ curr }
          value={ curr }
        >
          {curr}
        </option>))}
    </select>

  );
}

CurrencySelect.defaultProps = {
  onChange: null,
};

CurrencySelect.propTypes = {
  onChange: PropTypes.func,
};

export default CurrencySelect;
