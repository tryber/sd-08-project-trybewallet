import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, connect } from 'react-redux';

import * as actions from '../actions';

async function getCurrencyList() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((res) => res.json())
    .then((data) => Object.keys(data).filter((i) => i !== 'USDT'));
}

function CurrencySelect({ onChange, ...rest }) {
  const currList = useSelector((state) => state.wallet.currencies);
  const dispatch = useDispatch();
  // const fetchCurrList = async () => {
  //  if (currList.length === 0) {
  // const list = await getCurrencyList();
  // dispatch(actions.addCurrency(list));
  //  }
  // };

  // fetchCurrList();
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

const mapDispatchToProps = (dispatch) => ({
  addCurrency: dispatch(actions.addCurrency),
});
export default connect(null, mapDispatchToProps)(CurrencySelect);
