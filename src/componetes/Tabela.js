import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Tabela extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  linhasTabela() {
    const { wallet } = this.props;
    const { expenses } = wallet;
    return (
      expenses.map((e) => (
        <tr key={ e.id }>
          <th>{e.description}</th>
          <th>{e.tag}</th>
          <th>{e.method}</th>
          <th>{e.value}</th>
          <th>{e.exchangeRates[e.currency].name }</th>
          <th>
            {parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)}
          </th>
          <th>
            { (e.value * e.exchangeRates[e.currency].ask).toFixed(2) }
          </th>
          <th>Real</th>
          <th>Editar/Excluir</th>
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

Tabela.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.shape({
      value: PropTypes.string,
      map: PropTypes.func,
    }).isRequired,
  }),

};
Tabela.defaultProps = {
  wallet: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps)(Tabela);
