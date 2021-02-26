import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function CurrencySelector({ setCurrency }) {
  const wallet = useSelector((state) => state.wallet);

  function generateOptions() {
    const currencies = wallet.currencies[0];
    return Object.entries(currencies).map((e) => {
      const currency = e[0];
      if (currency === 'USDT') return false;
      return (
        <option
          key={ currency }
          value={ currency }
          data-testid={ currency }
        >
          {currency}
        </option>
      );
    });
  }
  return (
    <select
      data-testid="currency-input"
      onClick={ (button) => setCurrency(button.target.value) }
    >
      {!wallet.loading && generateOptions()}
    </select>
  );
}

CurrencySelector.propTypes = {
  setCurrency: PropTypes.func.isRequired,
};
