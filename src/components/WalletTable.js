import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletTable extends React.Component {
  tableTitle() {
    return (
      <tr>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </tr>
    );
  }

  tableLines(expensesStore) {
    return expensesStore.map((el, index) => {
      const { description, tag, method, value, currency, exchangeRates } = el;
      console.log(exchangeRates);
      const exchangeRateName = exchangeRates[currency].name;
      const exchangeRateNumber = Number(exchangeRates[currency].ask);
      const valueNumber = Number(value);
      const total = exchangeRateNumber * valueNumber;
      return (
        <tr key={ index }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ exchangeRateName }</td>
          <td>{ (exchangeRateNumber).toFixed(2) }</td>
          <td>{ (total).toFixed(2) }</td>
          <td>Real</td>
        </tr>
      );
    });
  }

  render() {
    const { expensesStore } = this.props;
    return (
      <table border="2">
        { this.tableTitle() }
        {this.tableLines(expensesStore)}
      </table>
    );
  }
}

WalletTable.propTypes = {
  expensesStore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expensesStore: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(WalletTable);
