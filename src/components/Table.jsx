import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editingExpense, rmExpense } from '../actions';

class Table extends React.Component {
  row({ id, description, tag, method, value, currency, exchangeRates }) {
    const { deleteRow, editRow } = this.props;
    return (
      <tr key={ id }>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{ parseFloat(value)}</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
        <td>{ parseFloat(exchangeRates[currency].ask * value).toFixed(2) }</td>
        <td>Real</td>
        <td className="buttons">
          <button type="button" data-testid="edit-btn" onClick={ () => editRow(id) }>
            &#x270e;
          </button>
          <button data-testid="delete-btn" type="button" onClick={ () => deleteRow(id) }>
            &#128465;
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
          {expenses.map((expense) => this.row(expense))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteRow: (id) => dispatch(rmExpense(id)),
  editRow: (id) => dispatch(editingExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
