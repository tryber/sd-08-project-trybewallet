import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpensesData } from '../actions';
import EditForm from '../components/EditForm';
import Formulario from './Formulario';

class TabelaDeGastos extends Component {
  constructor(props) {
    super(props);

    this.deleteExpense = this.deleteExpense.bind(this);

    this.state = {
      editForm: false,
      expenseToEdit: {},
    };
  }

  deleteExpense(expenseToDelete) {
    const { wallet, updateExpensesDataDispatch } = this.props;
    const { expenses } = wallet;
    const newExpenses = expenses.filter((expense) => expense.id !== expenseToDelete);
    updateExpensesDataDispatch(newExpenses);
  }

  render() {
    const { editForm, expenseToEdit } = this.state;
    const { wallet } = this.props;
    const { expenses } = wallet;
    return (
      <div>
        <h1>Tabela de Gastos </h1>
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
            {expenses && expenses.map((expense) => {
              const {
                id,
                description,
                tag,
                method,
                value,
                currency,
                exchangeRates,
              } = expense;
              const currencyName = exchangeRates[currency].name;
              const exchangeValue = parseFloat(exchangeRates[currency].ask).toFixed(2);
              const convertedValue = parseFloat(value * exchangeRates[currency].ask)
                .toFixed(2);
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{currencyName}</td>
                  <td>{exchangeValue}</td>
                  <td>{convertedValue}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.setState({
                        editForm: true,
                        expenseToEdit: expense,
                      })}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteExpense(expense.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        { editForm === true
          ? <EditForm expenseToEdit={expenseToEdit} />
          : <Formulario />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpensesDataDispatch: (expenses) => dispatch(updateExpensesData(expenses)),
});

TabelaDeGastos.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
  }).isRequired,
  updateExpensesDataDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabelaDeGastos);
