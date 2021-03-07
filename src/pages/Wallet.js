/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Wallet.css';
import HeaderWallet from './HeaderWallet';
import MenuWallet from './MenuWallet';
import { fetchAPI, deleteExpense } from '../actions/wallet';

class Wallet extends Component {
  componentDidMount() {
    const { getdata } = this.props;
    getdata();
  }

  renderTableTbody() {
    const { expenses, excludeExpense } = this.props;
    return (
      <tbody>
        {expenses
          && expenses.map(
            ({
              id,
              currency,
              description,
              method,
              tag,
              value,
              exchangeRates,
            }) => {
              const currencyData = exchangeRates[currency];
              const convertedValue = Number(value) * Number(currencyData.ask);
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{currencyData.name}</td>
                  <td>{(Math.round(currencyData.ask * 100) / 100).toFixed(2)}</td>
                  <td>{(Math.round(convertedValue * 100) / 100).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button className="table-button" type="button">
                      V
                    </button>
                    <button
                      onClick={ () => excludeExpense(id) }
                      className="table-button"
                      type="button"
                      data-testid="delete-btn"
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            },
          )}
      </tbody>
    );
  }

  renderTableThead() {
    return (
      <table>
        <thead>
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
        </thead>
        {this.renderTableTbody()}
      </table>
    );
  }

  render() {
    return (
      <div className="limiter-wallet">
        <div className="container-wallet container-wallet-bg">
          <HeaderWallet />
          <MenuWallet />
          <div className="wrap-wallet">
            <form name="f1" className="wallet-form validate-form">
              <div className="table">{this.renderTableThead()}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ wallet: { currencies, expenses, total } }) => ({
  currencies,
  expenses,
  total,
});
const mapDispatchToProps = (dispatch) => ({
  getdata: (getCurrencies) => dispatch(fetchAPI(getCurrencies)),
  excludeExpense: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  getdata: PropTypes.func.isRequired,
  excludeExpense: PropTypes.func.isRequired,

  expenses: PropTypes.objectOf.isRequired,
};
