import React from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteOrder } from '../actions/index';

class Table extends React.Component {
  tableOrder() {
    const { expenses, deleteButton, edit } = this.props;
    if (expenses.length !== 0) {
      return expenses.map((order, index) => {
        const { description, tag, method, exchangeRates, value, currency, id } = order;
        const { ask, name } = exchangeRates[currency];
        let number = parseFloat(ask);
        number = number.toFixed(2);
        return (
          <tr key={ index } className="tr-table">
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{value}</td>
            <td>{name}</td>
            <td>{number}</td>
            <td>{value * ask}</td>
            <td>Real</td>
            <td>
              <div className="button-div">
                <button
                  type="button"
                  onClick={ () => edit(id) }
                  name={ id }
                  data-testid="edit-btn"
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  name={ id }
                  onClick={ () => deleteButton(id) }
                >
                  Excluir
                </button>
              </div>
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
          <tr className="head-table">
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
        <tbody>
          {this.tableOrder()}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  deleteButton: propTypes.func.isRequired,
  edit: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteButton: (id) => dispatch(
    deleteOrder(id),
  ),
});

export default connect(null, mapDispatchToProps)(Table);
