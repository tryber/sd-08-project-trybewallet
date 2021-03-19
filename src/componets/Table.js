import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor() {
    super();
    this.state = { };

    this.inputTable = this.inputTable.bind(this);
    this.totalValue = this.totalValue.bind(this);
  }

  inputTable() {
    this.totalValue();
    const { expenses, delet, editExpense } = this.props;
    const headerArray = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <thead>
          {headerArray.map((item) => (
            <th key={ item }>
              {item}
            </th>))}
        </thead>
        <tbody>
          {expenses.map((item) => (
            <tr key={ item }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{item.value}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>
                {Number(item.exchangeRates[item.currency].ask).toFixed(2)}
              </td>
              <td>
                {(item.value * item.exchangeRates[item.currency].ask)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => delet(item.id) }
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
            </tr>))}
        </tbody>
      </table>
    );
  }

  totalValue() {
    const { expenses } = this.props;
    let count = 0;
    const arrayValues = expenses.map((item) => (
      item.value * (item.exchangeRates[item.currency].ask)
    ));
    for (let i = 0; i < arrayValues.length; i += 1) {
      count += arrayValues[i];
    }
  }

  render() {
    return (
      <div>
        {this.inputTable()}
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delet: (id) => dispatch({ type: 'DEL_DESPESA', id }),
  editExpense: (id) => dispatch({ type: 'EDIT_DESPESA', id }),
});

Table.propTypes = {
  expenses: PropTypes.string.isRequired,
  delet: PropTypes.string.isRequired,
  editExpense: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
