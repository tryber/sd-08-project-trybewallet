import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses } from '../actions/index';

class Table extends React.Component {
  list(expense) {
    const { deleteExpenseList } = this.props;
    const { value, description, currency, method, tag, exchangeRates, id } = expense;
    const currencieData = exchangeRates[currency];
    const converted = Number(value) * Number(currencieData.ask);
    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{currencieData.name}</td>
        <td>{(Math.round(currencieData.ask * 100) / 100).toFixed(2)}</td>
        <td>{(Math.round(converted * 100) / 100).toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button type="button">Editar</button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => deleteExpenseList(id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }

  delete({ target }) {
    const { deleteExpenseList } = this.props;
    deleteExpenseList(target.id);
  }

  render() {
    const { searchExpenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th> Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {searchExpenses.map((expense, index) => this.list(expense, index))}
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseList: (id) => dispatch(deleteExpenses(id)),
});

const mapStateToProps = (state) => ({
  searchExpenses: state.wallet.expenses,
});

Table.propTypes = {
  deleteExpenseList: PropTypes.func.isRequired,
  searchExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
