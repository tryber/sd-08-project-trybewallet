import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  constructor() {
    super();

    this.handleMap = this.handleMap.bind(this);
  }

  handleMap() {
    const { despesas } = this.props;
    console.log(despesas);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Cãmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Edita/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((expenses) => (
            <tr key={ expenses.id }>
              <td>{expenses.description}</td>
              <td>{expenses.tag}</td>
              <td>{expenses.method}</td>
              <td>{expenses.value}</td>
              <td>
                {expenses.exchangeRates[expenses.currency].name}
              </td>
              <td>
                {expenses.exchangeRates[expenses.currency].ask}
              </td>
              <td>
                {Number(expenses.value) * Number(
                  expenses.exchangeRates[expenses.currency].ask,
                )}
              </td>
              <td>Real Brasileiro</td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        {this.handleMap()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

Table.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Table);
