import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses as deleteAction,
  editExpenses as editAction,
} from '../actions';

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.renderTable = this.renderTable.bind(this);
  }

  deleteExpenses(e, index) {
    const { deleteExpenses } = this.props;
    e.preventDefault();
    deleteExpenses(index);
  }

  editExpenses(e, index) {
    const { editExpenses } = this.props;
    e.preventDefault();
    editExpenses(index);
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
          <td>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ (e) => this.deleteExpenses(e, id) }
            >
              Excluir
            </button>
          </td>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ (e) => this.editExpenses(e, id) }
          >
            Editar
          </button>
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
  deleteExpenses: PropTypes.func.isRequired,
  editExpenses: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenses: (payload) => dispatch(deleteAction(payload)),
  editExpenses: (payload) => dispatch(editAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
