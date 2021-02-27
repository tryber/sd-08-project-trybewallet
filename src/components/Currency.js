import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Currency extends Component {
  render() {
    const { getFields, currency, currencys } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          onChange={ getFields }
          name="currency"
          value={ currency }
          data-testid="currency-input"
          type="text"
          id="currency"
        >
          <option>Selecione</option>
          {currencys.map((currencyItem) => (
            <option data-testid={ currencyItem } key={ currencyItem }>
              {currencyItem}
            </option>
          ))}
        </select>
      </label>
    );
  }
}
Currency.propTypes = {
  getFields: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  currencys: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Currency;
