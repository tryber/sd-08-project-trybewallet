import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions/walletActions';

class ExpenseTable extends React.Component {
  constructor() {
    super();

    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense(event) {
    const { calcTotal, removeExpense } = this.props;
    removeExpense(event.target.id);
    calcTotal(event.target.id);
  }

  tableHeaderElements() {
    return (
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
    );
  }

  tableBodyElements() {
    const { expenses } = this.props;
    return (
      expenses.map((expense) => {
        const { currency, description, exchangeRates,
          id, method, tag, value } = expense;
        const { ask, name } = exchangeRates[currency];
        const convertedValue = (value * ask).toFixed(2);
        const roundedAsk = parseFloat(ask).toFixed(2);

        return (
          <tbody key={ `${id}-tbody` }>
            <tr key={ `${id}-tr` }>
              <td key={ `${id}-description` }>{ description }</td>
              <td key={ `${id}-tag` }>{ tag }</td>
              <td key={ `${id}-method` }>{ method }</td>
              <td key={ `${id}-value` }>{ value }</td>
              <td key={ `${id}-currency` }>{ name }</td>
              <td key={ `${id}-ask` }>{ roundedAsk }</td>
              <td key={ `${id}-convertedValue` }>{ convertedValue }</td>
              <td key={ `${id}-BRL` }>Real</td>
              <td key={ `${id}-buttons` }>
                <button type="button">Editar</button>
                <button
                  type="button"
                  onClick={ this.deleteExpense }
                  id={ id }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        );
      })
    );
  }

  render() {
    return (
      <table>
        <thead>
          { this.tableHeaderElements() }
        </thead>
        { this.tableBodyElements() }
      </table>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  removeExpense: PropTypes.func.isRequired,
  calcTotal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
