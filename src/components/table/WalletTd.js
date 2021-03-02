import React from 'react';
import PropTypes from 'prop-types';

const WalletTd = ({ data }) => {
  const { value, currency, exchangeRates, description, tag, method } = data;
  console.log(value, currency);
  const parsedValue = Math.round(value * 100) / 100;
  const ask = parseFloat(exchangeRates[currency].ask);
  let transformedValue = parsedValue * ask;
  transformedValue = Math.round(transformedValue * 100) / 100;
  const currencyName = exchangeRates[currency].name;

  return (
    <tr>
      <td>{description}</td>
      <td>{tag}</td>
      <td>{method}</td>
      <td>{parsedValue}</td>
      <td>{currencyName}</td>
      <td>{ask}</td>
      <td>{transformedValue}</td>
      <td>Real</td>
      <td>
        <button type="button">Edi</button>
        <button type="button">Del</button>
      </td>
    </tr>
  );
};

WalletTd.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default WalletTd;
