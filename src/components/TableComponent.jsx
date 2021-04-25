import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderExpenseRow = this.renderExpenseRow.bind(this);
  }

  handleEdit(expense) {
    console.log(expense);
  }

  handleDelete(expense) {
    const idRow = expense.id;
    const row = document.getElementById(`${idRow}`);
    const table = row.parentNode;
    table.deleteRow(idRow);
  }

  renderExpenseRow(expense) {
    const { description, tag, method, value, currency, exchangeRates } = expense;
    const exchangeRatesCurrency = exchangeRates[currency];
    const expenseConverted = Number(value) * Number(exchangeRatesCurrency.ask);

    return (
      <tr key={ expense.id } id={ expense.id }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{exchangeRatesCurrency.name}</td>
        <td>{ (Math.round(exchangeRatesCurrency.ask * 100) / 100).toFixed(2)}</td>
        <td>{ (Math.round(expenseConverted * 100) / 100).toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button
            onClick={ () => this.handleEdit(expense) }
            type="button"
          >
            Editar
          </button>
          <button
            data-testid="delete-btn"
            onClick={ () => this.handleDelete(expense) }
            type="button"
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
        <tbody>
          { expenses.map((expense) => this.renderExpenseRow(expense))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

TableComponent.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(TableComponent);
