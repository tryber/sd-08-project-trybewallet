import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tableHeaders, localCurrency } from '../const';
import { deleteExpense as deleteExpenseAction } from '../actions';
import iconEdit from '../images/icon-edit.png';
import iconDel from '../images/icon-del.png';
import './Table.css';

class Table extends React.Component {
  constructor() {
    super();
    this.renderHeaderTable = this.renderHeaderTable.bind(this);
    this.renderExpenses = this.renderExpenses.bind(this);
  }

  renderHeaderTable() {
    return (
      <tr>
        { tableHeaders.map((header) => (
          <th key={ header }>{ header }</th>
        )) }
      </tr>
    );
  }

  renderExpenses() {
    const { expenses, deleteExpense } = this.props;
    return (
      expenses.map((expense) => {
        const { id, description, tag, method, value, currency, exchangeRates } = expense;
        const exchange = [...Object.values(exchangeRates), localCurrency]
          .find((exg) => (exg.code === currency));
        return (
          <tr key={ id }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ exchange.name }</td>
            <td>{ parseFloat(exchange.ask).toFixed(2) }</td>
            <td>{ parseFloat(exchange.ask * value).toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button
                className="button-icon"
                data-testid="edit-btn"
                onClick={ () => console.log('Editar', expense) }
                type="button"
              >
                <img src={ iconEdit } alt="edit-icon" />
              </button>
              <button
                className="button-icon"
                data-testid="delete-btn"
                onClick={ () => deleteExpense(expense) }
                type="button"
              >
                <img src={ iconDel } alt="delete-icon" />
              </button>
            </td>
          </tr>
        );
      })
    );
  }

  render() {
    return (
      <table>
        <thead>
          <this.renderHeaderTable />
        </thead>
        <tbody>
          <this.renderExpenses />
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(deleteExpenseAction(expense)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.any.isRequired,
  ).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
