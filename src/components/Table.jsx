import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TableHeade from './TableHead';

class Table extends Component {
  checkPayment(type) {
    if (type === 'money') {
      return 'Dinheiro';
    } if (type === 'credit-card') {
      return 'Cartão de crédito';
    }
    return 'Cartão de débito';
  }

  checkRecreation(recreation) {
    if (recreation === 'food') {
      return 'Alimentação';
    } if (recreation === 'job') {
      return 'Trabalho';
    } if (recreation === 'recreation') {
      return 'Lazer';
    } if (recreation === 'transport') {
      return 'Transporte';
    }
    return 'Saúde';
  }

  checkValue(exchangeRates, expenseAmount, selectedCoin) {
    const value = exchangeRates.find((coinUsed) => coinUsed.name === selectedCoin).code;
    return `${value} ${Number((expenseAmount)).toFixed(2)}`;
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
              <td>{this.checkRecreation(coin.tag)}</td>
              <td>{this.checkPayment(coin.paymentMethod)}</td>
              <td>
                { this.checkValue(coin.exchangeRates,
                  coin.expenseAmount, coin.selectedCoin) }
              </td>
              <td>{coin.selectedCoin}</td>
              <td>
                {'R$ '}
                {Number(1 / coin.exchangeRates.find((coinUsed) => (
                  coinUsed.name === coin.selectedCoin)).ask).toFixed(2)}
              </td>
              <td>
                {parseFloat(coin.expenseAmount * coin.exchangeRates.find((item) => (
                  item.name === coin.selectedCoin
                )).ask).toFixed(2)}
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
