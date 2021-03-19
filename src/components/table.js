import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { delExpence, editExpence } from '../actions';

class Table extends React.Component {
  convert(value, ask) {
    const convert = Number(value) * Number(ask);
    return convert.toFixed(2);
  }

  cell() {
    const { expenses, delExpenceFunction, editExpenceFunction } = this.props;
    return (
      expenses.map((expense, index) => (
        <tr key={ index }>
          <td>{ expense.description }</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{expense.value}</td>
          <td>{expense.exchangeRates[expense.currency].name}</td>
          <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
          <td>
            {this.convert(expense.value,
              expense.exchangeRates[expense.currency].ask)}
          </td>
          <td>Real</td>
          <td>
            <button
              onClick={ () => editExpenceFunction(expense.id) }
              data-testid="edit-btn"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={ () => delExpenceFunction(expense.id) }
              id={ expense.id }
              data-testid="delete-btn"
              type="button"
            >
              Del
            </button>
          </td>
        </tr>
      ))
    );
  }

  render() {
    return (
      <table>
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
        {this.cell()}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpenceFunction: (id) => dispatch(delExpence(id)),
  editExpenceFunction: (id) => dispatch(editExpence(id)),
});

Table.propTypes = {
  expenses: PropTypes.node.isRequired,
  delExpenceFunction: PropTypes.func.isRequired,
  editExpenceFunction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
