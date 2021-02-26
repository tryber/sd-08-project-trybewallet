import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/tableExpenses.css';

class TableExpenses extends React.Component {
  showTableRow(expense) {
    const {
      id,
      currency,
      description,
      tag,
      method,
      value,
      exchangeRates,
    } = expense;
    const currencyInfo = exchangeRates[currency];
    const { name, ask } = currencyInfo;
    const convertTo = 'Real';
    return (
      <tr key={ id }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{name}</td>
        <td>{parseFloat(ask).toFixed(2)}</td>
        <td>{parseFloat(value * ask).toFixed(2)}</td>
        <td>{convertTo}</td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
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
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>{expenses.map((expense) => this.showTableRow(expense))}</tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableExpenses);

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    currency: PropTypes.number,
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
    exchangeRates: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,
};
