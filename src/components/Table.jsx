import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteExpense as deleteExpenseAction,
  changeEditStatus as changeEditStatusAction } from '../actions';

import TableHeader from './TableHeader';

class Table extends Component {
  checkValue(exchangeRates, value, currency) {
    const checkCoin = Object.values(exchangeRates)
      .find((coinUsed) => coinUsed.code === currency);

    const newValue = Number(Number(value).toFixed(2));
    if (checkCoin) return `${newValue}`;
    return '';
  }

  expenseValue(exchangeRates, currency) {
    const number = Object.values(exchangeRates).find((coinUsed) => (
      coinUsed.code === currency));
    if (number) {
      if (number % 1 === 0) {
        return Number(Number(number.ask).toFixed(2)).toString();
      }
      const result = Number(number.ask).toFixed(2);
      return result;
    }
    return '';
  }

  convertValue(exchangeRates, currency, value) {
    const ask = Object.values(exchangeRates).find((item) => (item.code === currency));
    if (ask) {
      const newValue = parseFloat(value * ask.ask);
      return newValue.toFixed(2);
    }
  }

  deleteExpense(coins, id) {
    const { deleteExpenseFromState } = this.props;
    const newExpenses = coins.filter((coin) => coin.id !== id);
    deleteExpenseFromState(newExpenses);
  }

  renderCurrencyName(exchangeRates, currency) {
    const currencyName = Object.values(exchangeRates)
      .find((coin) => coin.code === currency);
    return `${currencyName.name}`;
  }

  //   ${coin.exchangeRates.find((coinUsed) => (
  //     coinUsed.name === coin.selectedCoin)).code}
  // ${Number((coin.expenseAmount)).toFixed(2)}

  render() {
    const { coins, changeEditStatus } = this.props;
    return (
      <table style={ { borderCollapse: 'collapse' } } border="1">
        <TableHeader />
        <tbody>
          {coins.length > 0 && coins.map((coin) => (
            <tr key={ coin.id }>
              <td>
                {coin.description.charAt(0).toUpperCase() + coin.description.slice(1)}
              </td>
              <td>{coin.tag}</td>
              <td>{coin.method}</td>
              <td>
                { this.checkValue(coin.exchangeRates,
                  coin.value, coin.currency) }
              </td>
              <td>{this.renderCurrencyName(coin.exchangeRates, coin.currency)}</td>
              <td>
                {this.expenseValue(coin.exchangeRates, coin.currency)}
              </td>
              <td>
                {this.convertValue(coin.exchangeRates,
                  coin.currency,
                  coin.value)}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => changeEditStatus(coin.id, true) }
                >
                  Editar
                </button>
                <button
                  onClick={ () => this.deleteExpense(coins, coin.id) }
                  type="button"
                  data-testid="delete-btn"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  coins: expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseFromState: (expense) => dispatch(deleteExpenseAction(expense)),
  changeEditStatus: (id, edit) => dispatch(changeEditStatusAction(id, edit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseFromState: PropTypes.func.isRequired,
  changeEditStatus: PropTypes.func.isRequired,
};
