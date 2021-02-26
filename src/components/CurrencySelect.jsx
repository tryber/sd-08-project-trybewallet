import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import getCurrencyList from '../services/getCurrencyList';
import * as actions from '../actions';

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
    <label htmlFor="currency">
      Moeda:
      <select
        name="currency"
        data-testid="currency-input"
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
