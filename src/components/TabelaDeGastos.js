import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpensesData } from '../actions';
import EditForm from './EditForm';
import Formulario from './Formulario';

class TabelaDeGastos extends Component {
  constructor(props) {
    super(props);

    this.deleteExpense = this.deleteExpense.bind(this);
    this.renderTableHead = this.renderTableHead.bind(this);
    this.renderTableBody = this.renderTableBody.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.renderMethod = this.renderMethod.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.renderCurrencyName = this.renderCurrencyName.bind(this);
    this.renderExchangeValue = this.renderExchangeValue.bind(this);
    this.renderConvertedValue = this.renderConvertedValue.bind(this);
    this.renderReal = this.renderReal.bind(this);
    this.renderExpenseButtons = this.renderExpenseButtons.bind(this);

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

  renderTableHead() {
    return (
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
    );
  }

  renderDescription(description) {
    return (
      <td>{description}</td>
    );
  }

  renderTag(tag) {
    return (
      <td>{tag}</td>
    );
  }

  renderMethod(method) {
    return (
      <td>{method}</td>
    );
  }

  renderValue(value) {
    return (
      <td>{value}</td>
    );
  }

  renderCurrencyName(currencyName) {
    return (
      <td>{currencyName}</td>
    );
  }

  renderExchangeValue(exchangeValue) {
    return (
      <td>{exchangeValue}</td>
    );
  }

  renderConvertedValue(convertedValue) {
    return (
      <td>{convertedValue}</td>
    );
  }

  renderReal() {
    return (
      <td>Real</td>
    );
  }

  renderExpenseButtons(expense) {
    return (
      <td>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ () => this.setState({
            editForm: true,
            expenseToEdit: expense,
          }) }
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
    );
  }

  renderTableBody(expenses) {
    return (
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
              { this.renderDescription(description) }
              { this.renderTag(tag) }
              { this.renderMethod(method) }
              { this.renderValue(value) }
              { this.renderCurrencyName(currencyName) }
              { this.renderExchangeValue(exchangeValue) }
              { this.renderConvertedValue(convertedValue) }
              { this.renderReal() }
              { this.renderExpenseButtons(expense) }
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    const { editForm, expenseToEdit } = this.state;
    const { wallet } = this.props;
    const { expenses } = wallet;
    return (
      <div>
        <h1>Tabela de Gastos </h1>
        <table>
          { this.renderTableHead() }
          { this.renderTableBody(expenses) }
        </table>
        { editForm === true
          ? <EditForm expenseToEdit={ expenseToEdit } />
          : <Formulario />}
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
