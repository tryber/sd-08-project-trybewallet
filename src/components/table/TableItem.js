import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableItem extends Component {
  render() {
    const { expense, handleClick, handleEdit } = this.props;
    const { name, ask } = expense.exchangeRates[expense.currency];
    const { description, tag, method, value } = expense;
    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>Real</td>
        <td>{parseFloat(ask).toFixed(2)}</td>
        <td>{(ask * parseInt(value, 10).toFixed(2))}</td>
        <td>{name}</td>
        <td>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ () => handleClick(expense) }
          >
            Excluir

          </button>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => handleEdit(expense.id) }
          >
            Editar despesa
          </button>
        </td>
      </tr>
    );
  }
}

TableItem.propTypes = {
  expense: PropTypes.array,
}.isRequired;

// const mapStateToProps = (state) => ({

// })

export default connect()(TableItem);
