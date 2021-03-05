import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class WalletTable extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Moeda</th>
            <th>Valor</th>
            <th>Câmbio utilizado</th>
            <th>Moeda de conversão</th>
            <th>Valor convertido</th>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            const TEN = 10;
            const {
              description, tag, method, value,
              currency, exchangeRates,
            } = expense;
            const { name, ask } = exchangeRates.find(
              (currentCurrency) => currentCurrency.code === currency,
            );
            return (
              <tr key={ index }>
                <td>{name}</td>
                <td>{value}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>Real</td>
                <td>{(ask * Number(value, TEN)).toFixed(2)}</td>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button" data-testid="delete-btn">Excluir</button>
                </td>
                <td />
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
};

WalletTable.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, null)(WalletTable);
