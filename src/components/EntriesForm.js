import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteExpense as eraseExpense, editExpense as modifyExpense } from '../actions';

class EntriesForm extends React.Component {
  renderButton(name, expense, callback) {
    return (
      <button
        type="button"
        data-testid={ `${name}-btn` }
        onClick={ () => callback(expense) }
      >
        {name === 'edit' ? 'Editar' : 'Excluir'}
      </button>
    );
  }

  render() {
    const { expenses, deleteExpense, editExpense } = this.props;
    return (
      <table>
        <thead className="table-header">
          <tr>
            <th>Moeda</th>
            <th>Valor</th>
            <th>Câmbio utilizado</th>
            <th>Moeda de conversão</th>
            <th>Valor convertido</th>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {expenses.map((expense, index) => {
            const { description, tag, method, value, currency, exchangeRates } = expense;
            const { name, ask } = exchangeRates[currency];
            return (
              <tr key={ index }>
                <td>{name}</td>
                <td>{value}</td>
                <td>{parseFloat(ask).toFixed(2)}</td>
                <td>Real</td>
                <td>{(ask * parseInt(value, 10)).toFixed(2)}</td>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>
                  {this.renderButton('delete', expense, deleteExpense)}
                  {this.renderButton('edit', expense, editExpense)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(eraseExpense(expense)),
  editExpense: (expense) => dispatch(modifyExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntriesForm);

EntriesForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

EntriesForm.defaultProps = {
  expenses: [],
};
