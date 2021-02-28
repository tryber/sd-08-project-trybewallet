import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <td>Descrição</td>
          <td>Tag</td>
          <td>Método de pagamento</td>
          <td>Valor</td>
          <td>Moeda</td>
          <td>Câmbio utilizado</td>
          <td>Valor convertido</td>
          <td>Moeda de conversão</td>
          <td>Editar/Excluir</td>
        </tr>
        {expenses.map((key) => {
          const { ask, name } = key.exchangeRates[key.currency];
          return (
            <tr key={ key.id }>
              <td>{key.description}</td>
              <td>{key.tag}</td>
              <td>{key.method}</td>
              <td>{key.value}</td>
              <td>Real</td>
              <td>{Number(ask).toFixed(2)}</td>
              <td>{(ask * Number(key.value)).toFixed(2)}</td>
              <td>{name}</td>
            </tr>
          );
        })}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Table);
