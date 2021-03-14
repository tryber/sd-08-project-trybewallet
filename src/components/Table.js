import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenses } from '../actions/index';

class Table extends React.Component {
  constructor() {
    super();

    this.handleMap = this.handleMap.bind(this);
  }

  handleMap() {
    const { despesas, remove } = this.props;
    return (
      <tbody>
        {despesas.map((expenses) => (
          <tr key={ expenses.id }>
            <td>{expenses.description}</td>
            <td>{expenses.tag}</td>
            <td>{expenses.method}</td>
            <td>{expenses.value}</td>
            <td>
              {expenses.exchangeRates[expenses.currency].name}
            </td>
            <td>
              {Math.round(expenses.exchangeRates[expenses.currency].ask * 100) / 100}
            </td>
            <td>
              {
                Math.round(Number(expenses.value) * Number(
                  expenses.exchangeRates[expenses.currency].ask,
                ) * 100) / 100
              }
            </td>
            <td>Real</td>
            <td>
              <button type="button">Editar</button>
              <button
                onClick={ () => remove(expenses.id) }
                data-testid="delete-btn"
                type="button"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
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
        {this.handleMap()}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(removeExpenses(id)),
});

Table.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.object).isRequired,
  remove: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
