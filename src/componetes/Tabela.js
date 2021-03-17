import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense as deleteExpenseAction } from '../actions/wallet';

class Tabela extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  linhasTabela() {
    const { wallet, deleteExpense } = this.props;
    const { expenses } = wallet;
    return (
      expenses.map((e) => (
        <tr key={ e.id } role="row">
          <td>{e.description}</td>
          <td>{e.tag}</td>
          <td>{e.method}</td>
          <td>{e.value}</td>
          <td>{e.exchangeRates[e.currency].name }</td>
          <td>
            {parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)}
          </td>
          <td>
            { (e.value * e.exchangeRates[e.currency].ask).toFixed(2) }
          </td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => deleteExpense(e.id) }
            >
              deletar
            </button>

          </td>
        </tr>))
    );
  }

  render() {
    return (
      <table>
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
        {this.linhasTabela()}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(deleteExpenseAction(payload)),
});

Tabela.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.shape({
      value: PropTypes.string,
      map: PropTypes.func,
    }).isRequired,
  }),
  deleteExpense: PropTypes.func.isRequired,
};
Tabela.defaultProps = {
  wallet: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabela);
