import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TableHeade from './TableHead';

class Table extends Component {
  checkValue(exchangeRates, expenseAmount, selectedCoin) {
    const value = Array.from(exchangeRates)
      .find((coinUsed) => coinUsed.name === selectedCoin);
    if (value) return `${value.code} ${Number((expenseAmount)).toFixed(2)}`;
    return '';
  }

  expenseValue(exchangeRates, selectedCoin) {
    const number = Array.from(exchangeRates).find((coinUsed) => (
      coinUsed.name === selectedCoin));
    if (number) {
      const result = (1 / Number(number.ask)).toFixed(2);
      return result;
    }
    return '';
  }

  convertValue(exchangeRates, selectedCoin, expenseAmount) {
    const ask = Array.from(exchangeRates).find((item) => (item.name === selectedCoin));
    if (ask) {
      const value = parseFloat(expenseAmount * ask.ask);
      return value.toFixed(2);
    }
  }

  //   ${coin.exchangeRates.find((coinUsed) => (
  //     coinUsed.name === coin.selectedCoin)).code}
  // ${Number((coin.expenseAmount)).toFixed(2)}

  render() {
    const { coins } = this.props;
    return (
      <table border="1">
        <TableHeade />
        <tbody>
          {coins.length > 0 && coins.map((coin) => (
            <tr key={ coin.id }>
              <td>
                {coin.description.charAt(0).toUpperCase() + coin.description.slice(1)}
              </td>
              <td>{coin.tag}</td>
              <td>{coin.paymentMethod}</td>
              <td>
                { this.checkValue(coin.exchangeRates,
                  coin.expenseAmount, coin.selectedCoin) }
              </td>
              <td>{coin.selectedCoin}</td>
              <td>
                {'R$ '}
                {this.expenseValue(coin.exchangeRates, coin.selectedCoin)}
              </td>
              <td>
                {this.convertValue(coin.exchangeRates,
                  coin.selectedCoin,
                  coin.expenseAmount)}
              </td>
              <td>Real</td>
              <td>Editar / Excluir</td>
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

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.object).isRequired,
};
