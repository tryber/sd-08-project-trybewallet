import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  constructor() {
    super();

    this.inputTable = this.inputTable.bind(this);
    this.totalValue = this.totalValue.bind(this);
  }

  inputTable() {
    this.totalValue();
    const { expenses, deleteExpense, editExpense } = this.props;
    const headerArray = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <thead>
          {headerArray.map((item) => (
            <th key={ item }>{ item }</th>))}
        </thead>
        <tbody>
          {expenses.map((item) => (
            <tr key={ item }>
              <td>{ item.description }</td>
              <td>{ item.tag }</td>
              <td>{ item.method }</td>
              <td>{ item.value }</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
              <td>{(item.value * item.exchangeRates[item.currency].ask)}</td>
              <td>
                Real
              </td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => deleteExpense(item.id) }
                >
                  Excluir
                </button>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => editExpense(item.id) }
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  totalValue() {
    const { expenses } = this.props;
    const arrayValues = expenses.map((item) => (
      item.value * (item.exchangeRates[item.currency].ask)
    ));
    let count = 0;
    for (let i = 0; i < arrayValues.length; i += 1) {
      count += arrayValues[i];
    }
    return count;
  }

  render() {
    return (
      <div>
        { this.inputTable() }
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.string.isRequired,
  deleteExpense: PropTypes.string.isRequired,
  editExpense: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch({ type: 'DEL_EXPENSE', id }),
  editExpense: (id) => dispatch({ type: 'EDIT_VALUE', id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
