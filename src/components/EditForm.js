import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiCurrencies, updateExpensesData } from '../actions';

class EditForm extends Component {
  constructor(props) {
    super(props);

    this.editExpenseInfos = this.editExpenseInfos.bind(this);
    this.saveEditedExpense = this.saveEditedExpense.bind(this);
    this.renderExpenseValueInput = this.renderExpenseValueInput.bind(this);
    this.renderExpenseDescriptionInput = this.renderExpenseDescriptionInput.bind(this);
    this.renderCurrencySelect = this.renderCurrencySelect.bind(this);
    this.renderPaymentMethodSelect = this.renderPaymentMethodSelect.bind(this);
    this.renderExpenseTagSelect = this.renderExpenseTagSelect.bind(this);
    this.renderEditExpenseButton = this.renderEditExpenseButton.bind(this);

    const { expenseToEdit } = this.props;
    this.state = {
      id: expenseToEdit.id,
      value: expenseToEdit.value,
      description: expenseToEdit.description,
      currency: expenseToEdit.currency,
      method: expenseToEdit.method,
      tag: expenseToEdit.tag,
    };
  }

  componentDidMount() {
    const { apiCurrenciesDispatch } = this.props;
    apiCurrenciesDispatch();
  }

  editExpenseInfos({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  async saveEditedExpense() {
    const { apiCurrenciesDispatch, updateExpensesDataDispatch } = this.props;
    const { wallet } = this.props;
    const { expenses } = wallet;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { currenciesJson } = await apiCurrenciesDispatch();
    const newExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currenciesJson,
    };
    const newExpensesData = expenses.map((expense) => {
      if (expense.id === id) {
        return newExpense;
      }
      return expense;
    });
    await updateExpensesDataDispatch(newExpensesData);
  }

  renderExpenseValueInput(value) {
    return (
      <label htmlFor="editExpenseValue">
        Valor:
        <input
          type="number"
          id="editExpenseValue"
          name="value"
          step="0.01"
          min="0"
          data-testid="value-input"
          value={ value }
          onChange={ this.editExpenseInfos }
        />
      </label>
    );
  }

  renderExpenseDescriptionInput(description) {
    return (
      <label htmlFor="editExpenseDescription">
        Descrição:
        <input
          type="text"
          id="editExpenseDescription"
          name="description"
          data-testid="description-input"
          value={ description }
          onChange={ this.editExpenseInfos }
        />
      </label>
    );
  }

  renderCurrencySelect(currenciesList, currency) {
    return (
      <label htmlFor="editCurrency">
        Moeda:
        <select
          id="editCurrency"
          name="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.editExpenseInfos }
        >
          {currenciesList && currenciesList.map((currencyOption) => (
            <option
              key={ currencyOption }
              data-testid={ `${currencyOption}` }
            >
              {currencyOption}
            </option>))}
        </select>
      </label>
    );
  }

  renderPaymentMethodSelect(method) {
    return (
      <label htmlFor="editPaymentMethod">
        Método de Pagamento:
        <select
          id="editPaymentMethod"
          name="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.editExpenseInfos }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderExpenseTagSelect(tag) {
    return (
      <label htmlFor="editExpenseTag">
        Tag:
        <select
          id="editExpenseTag"
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.editExpenseInfos }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  renderEditExpenseButton() {
    return (
      <button
        type="button"
        name="Editar Despesa"
        onClick={ this.saveEditedExpense }
      >
        Editar despesa
      </button>
    );
  }

  render() {
    const { wallet } = this.props;
    const { currenciesList, isFetching } = wallet;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <div>
        {isFetching && (!currenciesList || currenciesList.length)
          ? <p>Carregando...</p>
          : (
            <form id="editExpenseForm">
              <h2>Despesa a Editar</h2>
              { this.renderExpenseValueInput(value) }
              <br />
              { this.renderExpenseDescriptionInput(description) }
              <br />
              { this.renderCurrencySelect(currenciesList, currency) }
              <br />
              { this.renderPaymentMethodSelect(method) }
              <br />
              { this.renderExpenseTagSelect(tag) }
              <br />
              { this.renderEditExpenseButton() }
            </form>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  apiCurrenciesDispatch: (currencies) => dispatch(apiCurrencies(currencies)),
  updateExpensesDataDispatch: (expenses) => dispatch(updateExpensesData(expenses)),
});

EditForm.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
    currencies: PropTypes.arrayOf.isRequired,
    currenciesList: PropTypes.arrayOf.isRequired,
    error: PropTypes.string,
    isFetching: PropTypes.bool,
  }).isRequired,
  apiCurrenciesDispatch: PropTypes.func.isRequired,
  updateExpensesDataDispatch: PropTypes.func.isRequired,
  expenseToEdit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
