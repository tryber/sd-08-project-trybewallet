import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
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
        </thead>
        {expenses.map((element) => {
          const { ask, name } = element.exchangeRates[element.currency];
          return (
            <tbody key={ element.id }>
              <tr>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{element.value}</td>
                <td>{name}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>{(ask * Number(element.value)).toFixed(2)}</td>
                <td>Real</td>
              </tr>
            </tbody>
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
