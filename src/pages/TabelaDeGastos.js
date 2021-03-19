import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense as deleteExpenseAction } from '../actions/index';

class TabelaDeGastos extends React.Component {
  constructor() {
    super();

    this.renderTableData = this.renderTableData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    const { expenses, deleteExpense } = this.props;
    const updatedExpenses = expenses.filter((e) => e.id !== id);
    deleteExpense(updatedExpenses);
  }

  renderTableData() {
    const { expenses } = this.props;
    return (
      <tbody>
        {expenses.map((e) => {
          const cambio = (
            // Math.floor(e.exchangeRates[e.currency].ask * 100) / 100
            parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)
          );
          const valorConv = e.value * e.exchangeRates[e.currency].ask;
          const valorConvArr = Math.floor(valorConv * 100) / 100;
          return (
            <tr key={ e.id }>
              <td>{ e.description }</td>
              <td>{e.tag}</td>
              <td>{ e.method }</td>
              <td>{ e.value }</td>
              <td>{ e.exchangeRates[e.currency].name }</td>
              <td>{ cambio }</td>
              <td>{ valorConvArr }</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => { this.handleDelete(e.id); } }
                >
                  Deletar
                </button>
              </td>
            </tr>);
        })}
      </tbody>
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
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { this.renderTableData() }
      </table>
    );
  }
}

TabelaDeGastos.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (e) => dispatch(deleteExpenseAction(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabelaDeGastos);
