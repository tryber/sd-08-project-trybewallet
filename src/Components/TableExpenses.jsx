import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Actions from '../actions';
import '../style/tableExpenses.css';

class TableExpenses extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

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
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.handleClick(id) }
          >
            Excluir
          </button>
        </td>
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

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(Actions.deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      currency: PropTypes.string,
      description: PropTypes.string,
      tag: PropTypes.string,
      method: PropTypes.string,
      value: PropTypes.string,
      exchangeRates: PropTypes.shape(PropTypes.object),
    }),
  ).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};
