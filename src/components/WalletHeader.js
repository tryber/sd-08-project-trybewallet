import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends Component {

  expensesSum() {
    const { expensesStore } = this.props;
    // console.log(expensesStore[0]);
    const expensesMap = expensesStore.map((el) => {
      const { currency, valueExpense, exchangeRates } = el;
      // console.log(currency, valueExpense, exchangeRates);
      const exchangeRatesNumber = Number(exchangeRates[currency].ask);
      console.log(exchangeRatesNumber);
      const valueExpenseNumber = Number(valueExpense);
      console.log(valueExpenseNumber);
      const sum = exchangeRatesNumber * valueExpenseNumber;
      console.log(sum);
      return sum;
    });
    console.log(expensesMap);
    expensesMap.reduce((total, expense) => total + expense, 0);
    return expensesMap;
  }

// getTotal() {
//     const { expensesStore } = this.props;
//     console.log(expensesStore[0]);
//     return expensesStore
//       .map(({ currency, valueExpense, exchangeRates }) => {
//         const currencyData = exchangeRates[currency];
//         const total = Number(valueExpense) * Number(currencyData.ask);
//         return total;
//       })
//       .reduce((acc, expense) => acc + expense, 0);
//   }

  render() {
    const { emailStore } = this.props;
    return (
      <header>
        <ul>
          <li data-testid="email-field">{`Usuário Logado: ${emailStore}`}</li>
          <li data-testid="total-field">
            Total: R$
            {this.expensesSum()}
            {/* {this.getTotal()} */}
            {/* { (Math.round(this.getTotal() * 100) / 100).toFixed(2) } */}
          </li>
          <li data-testid="header-currency-field">Câmbio: BRL </li>
        </ul>
      </header>
    );
  }
}

WalletHeader.propTypes = {
  emailStore: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailStore: state.loginUserReducer.email,
  expensesStore: state.walletReducer.expenses,
});
export default connect(mapStateToProps, null)(WalletHeader);
