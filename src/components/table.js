import React from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteOrder } from '../actions/index';

class Table extends React.Component {
  tableOrder() {
    const { expenses, deleteButton } = this.props;
    if (expenses.length !== 0) {
      return expenses.map((order, index) => {
        const { description, tag, method, exchangeRates, value, currency, id } = order;
        const { ask, name } = exchangeRates[currency];
        let number = parseFloat(ask);
        number = number.toFixed(2);
        return (
          <tr key={ index }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{value}</td>
            <td>{name}</td>
            <td>{number}</td>
            <td>{value * ask}</td>
            <td>Real</td>
            <td>
              <button type="button">Editar</button>
              <button
                type="button"
                data-testid="delete-btn"
                name={ id }
                onClick={ () => deleteButton(id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        );
      });
    }
    return <tr>{}</tr>;
  }

  render() {
    return (
      <table className="table">
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
          {this.tableOrder()}
        </thead>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  deleteButton: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteButton: (id) => dispatch(
    deleteOrder(id),
  ),
});

export default connect(null, mapDispatchToProps)(Table);
