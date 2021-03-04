import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { wallet } from '../actions';

class TabelaGastos extends Component {
  renderCabecalho() {
    return (
      <tr>
        <th>#</th>
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

  render() {
    const { expenses, deleteExpense } = this.props;
    return (
      <main>
        <thead>
          {this.renderCabecalho()}
        </thead>
        <tbody>
          {expenses.map((
            { id, value, description, currency, method, tag, exchangeRates },
          ) => (
            <tr key={ id }>
              <td>{id}</td>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>
                {((
                  parseFloat(exchangeRates[currency].ask * 100) / 100)).toFixed(2)}
              </td>
              <td>
                {((
                  parseFloat(value * exchangeRates[currency].ask)
                    * 100) / 100).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => deleteExpense(id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </main>
    );
  }
}

TabelaGastos.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(wallet, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabelaGastos);
