import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import deleteExpenseAction from '../../actions/deleteExpenseAction';
import editExpenseAction from '../../actions/editExpenseAction';

class WalletTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableHeaderTexts = [
      'Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir',
    ];
  }

  render() {
    const { expenses, deleteExpense, editExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {this.tableHeaderTexts.map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => {
            const currency = expense.exchangeRates[expense.currency];
            const converted = Number(expense.value) * Number(currency.ask);
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{currency.name}</td>
                <td>{ (Math.round(currency.ask * 100) / 100).toFixed(2) }</td>
                <td>{ (Math.round(converted * 100) / 100).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => editExpense(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteExpense(expense.id) }
                  >
                    Excluir
                  </button>
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
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
  editExpense: (id) => dispatch(editExpenseAction(id)),
});

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
