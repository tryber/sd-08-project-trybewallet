import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, subtractFromTotal } from '../../actions';

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
    const { removeExp, removeFromTotal } = this.props;
    const {
      expense: {
        id,
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

    const convertedValue = parseFloat((value * conversionRate).toFixed(2));

    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{currencyName}</td>
        <td>{parseFloat(conversionRate).toFixed(2)}</td>
        <td>{convertedValue}</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => {
              removeFromTotal(convertedValue);
              removeExp(id);
            } }
          >
            delete

          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeExp: (expenseId) => dispatch(removeExpense(expenseId)),
  removeFromTotal: (expenseId) => dispatch(subtractFromTotal(expenseId)),
});

ExpenseRow.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
    currency: PropTypes.string,
    exchangeRates: PropTypes.shape({}),
  }).isRequired,
  removeExp: PropTypes.func.isRequired,
  removeFromTotal: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpenseRow);
