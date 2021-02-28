import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../actions';

class Table extends React.Component {
  render() {
    const { expenses, deleteExp, editExp } = this.props;
    return (
      <div>
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
          <tbody>
            { expenses.map((expense) => {
              const { id, description, tag, method, value, currency, exchangeRates: {
                [currency]: { ask, name },
              } } = expense;
              const res = Math.round((ask * value) * 100) / 100;
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ name }</td>
                  <td>{ Number(ask).toFixed(2) }</td>
                  <td>{ res }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => editExp(expense) }
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => deleteExp(id, expenses) }
                    >
                      deletar
                    </button>
                  </td>
                </tr>);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExp: (id, expenses) => dispatch(deleteExpense(id, expenses)),
  editExp: (expense) => dispatch(editExpense(expense)),
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Object).isRequired,
  deleteExp: PropTypes.func.isRequired,
  editExp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
