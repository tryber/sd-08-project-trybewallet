import React from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector, connect } from 'react-redux';

import * as actions from '../actions';

const arr = [];
async function getCurrencyList() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((res) => res.json())
    .then((data) => arr.push(Object.keys(data).filter((i) => i !== 'USDT')));
}
getCurrencyList();

function CurrencySelect() {
  console.log(arr);
  return (
    <select
      name="currency"
      data-testid="currency-input"
      role="combobox"
      // onChange={ onChange }
      // { ...rest }
    >
      { arr.map((curr) => (
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
/*
CurrencySelect.defaultProps = {
  onChange: null,
};

CurrencySelect.propTypes = {
  onChange: PropTypes.func,
}; */

const mapDispatchToProps = (dispatch) => ({
  addCurrency: dispatch(actions.addCurrency),
});
export default connect(null, mapDispatchToProps)(CurrencySelect);
