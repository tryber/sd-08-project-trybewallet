import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpenseLine from './ExpenseLine';

class ExpensesTable extends Component {
  render() {
    const { expenses } = this.props;
    const renderLines = (
      <tbody>
        {expenses.map((expense, index) => (
          <ExpenseLine key={ index } expense={ expense } />
        ))}
      </tbody>
    );

    const noRenderLines = (
      <tbody>
        <tr>
          <td>Sem Despesas a Exibir</td>
        </tr>
      </tbody>
    );
    return (
      <table border="1">
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>
        { expenses.length > 0 ? renderLines : noRenderLines }
      </table>
    );
  }
}
ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string,
      description: PropTypes.string,
      exchangeRates: PropTypes.objectOf(
        PropTypes.object,
      ),
      method: PropTypes.string,
      tag: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(ExpensesTable);
