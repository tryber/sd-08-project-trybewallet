import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor() {
    super();
    this.inputTable = this.inputTable.bind(this);
    this.totalValue = this.totalValue.bind(this);
  }

  totalValue() {
    const { expenses, totalAmount } = this.props;

    let total = 0;
    const arr = expenses.map((objs) => (objs.value
    * (objs.exchangeRates[objs.currency].ask)));
    for (let i = 0; i < arr.length; i += 1) {
      total += arr[i];
    }
    totalAmount(total);
  }

  inputTable() {
    this.totalValue();
    const { expenses, deleteExpense, editExpense } = this.props;
    const headerArray = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    return (
      <table>
        <thead>
          {headerArray.map((title) => <th key={ title }>{title}</th>)}
        </thead>
        <tbody>
          {expenses.map((data) => (
            <tr key={ data.id }>
              <td>{data.description}</td>
              <td>{data.tag}</td>
              <td>{data.method}</td>
              <td>{data.value}</td>
              <td>{data.exchangeRates[data.currency].name}</td>
              <td>{Number(data.exchangeRates[data.currency].ask).toFixed(2)}</td>
              <td>{(data.value * data.exchangeRates[data.currency].ask)}</td>
              <td>Real</td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => deleteExpense(data.id) }
              >
                Excluir
              </button>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => editExpense(data.id) }
              >
                Editar
              </button>
            </tr>))}
        </tbody>
      </table>
    );
  }

  render() {
    return <div>{this.inputTable()}</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch({ type: 'DELETE_EXPENSE', id }),
  totalAmount: (amount) => dispatch({ type: 'TOTAL_AMOUNT', amount }),
  editExpense: (id) => dispatch({ type: 'EDIT_EXPENSE', id }),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.shape.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  totalAmount: PropTypes.number.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
