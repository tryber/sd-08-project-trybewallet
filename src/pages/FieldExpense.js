import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { /* responseCurrencies, */

  removeExpense as deleteExpense,
  editExpense as completeExpense } from '../actions';

class FildExpense extends Component {
  render() {
    const { expenses } = this.props;
    const { removeExpense, editExpense } = this.props;
    return (
      <>

        {expenses.map((expense, index) => {
          const { description, tag, method, value, currency, exchangeRates } = expense;
          const { name, ask } = exchangeRates[currency];
          return (
            <tr key={ index }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{name}</td>
              <td>{parseFloat(ask).toFixed(2)}</td>
              <td>{(ask * value).toFixed(2)}</td>
              <td>Real</td>

              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => removeExpense(expense) }
                >
                  Excluir
                </button>

                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => editExpense(expense) }
                >
                  Editar
                </button>

              </td>
            </tr>
          );
        })}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(deleteExpense(expense)),
  editExpense: (expense) => dispatch(completeExpense(expense)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FildExpense);

FildExpense.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};
FildExpense.defaultProps = {
  expenses: [],
};
