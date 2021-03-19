import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteExpense } from '../actions';

class EntriesForm extends React.Component {
  renderButton(name, expense, callback) {
    return (
      <button
        type="button"
        data-testid={ `${name}-btn` }
        onClick={ () => callback(expense) }
        className={ `${name}-btn expense-opt-btn` }
      >
        DELETAR
      </button>
    );
  }

  render() {
    const { expenses, exclude } = this.props;
    return (
      <table>
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
        <div>
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
                  {this.renderButton('delete', expense, exclude)}
                </td>
              </tr>
            );
          })}
        </div>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  exclude: (expense) => dispatch(deleteExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntriesForm);

EntriesForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  exclude: PropTypes.func.isRequired,
};

EntriesForm.defaultProps = {
  expenses: [],
};
