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
              descriptionInput, tagInput, methodInput, valueInput,
              currency, coinsExchange,
            } = expense;
            const { name, ask } = coinsExchange.find(
              (currentCurrency) => currentCurrency.code === currency,
            );
            return (
              <tr key={ index }>
                <td>{name}</td>
                <td>{valueInput}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>BRL</td>
                <td>{(ask * Number(valueInput, TEN)).toFixed(2)}</td>
                <td>{descriptionInput}</td>
                <td>{tagInput}</td>
                <td>{methodInput}</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
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
  expenses: PropTypes.objectOf(PropTypes.object),
};

WalletTable.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, null)(WalletTable);
