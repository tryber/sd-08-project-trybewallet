import React from 'react';
import PropTypes from 'prop-types';

class ExpenseRow extends React.Component {
  extractCurrencyInfos(currency, exchangeRates) {
    const currencyArray = Object.values(exchangeRates)
      .find((currCurrency) => currCurrency.code === currency);
    return ({
      currencyName: currencyArray.name,
      conversionRate: currencyArray.ask,
    });
  }

  render() {
    const { expense: {
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
    } } = this.props;
    const {
      currencyName,
      conversionRate,
    } = this.extractCurrencyInfos(currency, exchangeRates);
    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{currencyName}</td>
        <td>{parseFloat(conversionRate).toFixed(2)}</td>
        <td>{(value * conversionRate).toFixed(2)}</td>
        <td>Real</td>
        <td>edit buttons</td>
      </tr>
    );
  }
}

ExpenseRow.propTypes = {
  expense: PropTypes.shape({
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
    currency: PropTypes.string,
    exchangeRates: PropTypes.shape({}),
  }).isRequired,
};

export default ExpenseRow;
