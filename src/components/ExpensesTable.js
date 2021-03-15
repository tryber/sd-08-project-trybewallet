import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.renderTable = this.renderTable.bind(this);
  }

  renderTable() {
    const { expenses } = this.props;
    return expenses.map(
      ({ id, description, method, tag, exchangeRates, currency, value }) => (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{tag}</td>
          <td>{ method }</td>
          <td>{value }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
          <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
          <td>Real</td>
        </tr>
      ),
    );
  }

  render() {
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
            <th>Moeda de conversão</th>
            <th>Valor convertido</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTable()}
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);
