import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiCurrencies, updateExpensesData } from '../actions';

class Formulario extends Component {
  constructor(props) {
    super(props);

    this.sendNewExpenseInfos = this.sendNewExpenseInfos.bind(this);
    this.addNewExpense = this.addNewExpense.bind(this);
    this.renderExpenseValueInput = this.renderExpenseValueInput.bind(this);
    this.renderExpenseDescriptionInput = this.renderExpenseDescriptionInput.bind(this);
    this.renderCurrencySelect = this.renderCurrencySelect.bind(this);
    this.renderPaymentMethodSelect = this.renderPaymentMethodSelect.bind(this);
    this.renderExpenseTagSelect = this.renderExpenseTagSelect.bind(this);
    this.renderEditExpenseButton = this.renderEditExpenseButton.bind(this);

    this.state = {
      expenseValue: 0,
      expenseDescription: '',
      currency: 'USD',
      paymentMethod: 'Dinheiro',
      expenseTag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { apiCurrenciesDispatch } = this.props;
    apiCurrenciesDispatch();
  }

  resetState() {
    this.setState({
      expenseValue: 0,
      expenseDescription: '',
      currency: 'USD',
      paymentMethod: 'Dinheiro',
      expenseTag: 'Alimentação',
    });
  }

  sendNewExpenseInfos({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  async addNewExpense() {
    const { apiCurrenciesDispatch, updateExpensesDataDispatch } = this.props;
    const { wallet } = this.props;
    const { expenses } = wallet;
    const {
      expenseValue,
      expenseDescription,
      currency,
      paymentMethod,
      expenseTag,
    } = this.state;
    const id = expenses.length;
    const { currenciesJson } = await apiCurrenciesDispatch();
    const newExpense = {
      id,
      value: expenseValue,
      description: expenseDescription,
      currency,
      method: paymentMethod,
      tag: expenseTag,
      exchangeRates: currenciesJson,
    };
    const newExpensesData = expenses.concat(newExpense);
    updateExpensesDataDispatch(newExpensesData);
    this.resetState();
  }

  renderExpenseValueInput(expenseValue) {
    return (
      <label htmlFor="expenseValue">
        Valor:
        <input
          type="number"
          id="expenseValue"
          name="expenseValue"
          step="0.01"
          min="0"
          data-testid="value-input"
          value={ expenseValue }
          onChange={ this.sendNewExpenseInfos }
        />
      </label>
    );
  }

  renderExpenseDescriptionInput(expenseDescription) {
    return (
      <label htmlFor="expenseDescription">
        Descrição:
        <input
          type="text"
          id="expenseDescription"
          name="expenseDescription"
          data-testid="description-input"
          value={ expenseDescription }
          onChange={ this.sendNewExpenseInfos }
        />
      </label>
    );
  }

  renderCurrencySelect(currenciesList, currency) {
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.sendNewExpenseInfos }
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

  renderPaymentMethodSelect(paymentMethod) {
    return (
      <label htmlFor="paymentMethod">
        Método de Pagamento:
        <select
          id="paymentMethod"
          name="paymentMethod"
          data-testid="method-input"
          value={ paymentMethod }
          onChange={ this.sendNewExpenseInfos }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderExpenseTagSelect(expenseTag) {
    return (
      <label htmlFor="expenseTag">
        Tag:
        <select
          id="expenseTag"
          name="expenseTag"
          data-testid="tag-input"
          value={ expenseTag }
          onChange={ this.sendNewExpenseInfos }
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
        name="Adicionar Despesa"
        data-testid="login-submit-btn"
        onClick={ this.addNewExpense }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { wallet } = this.props;
    const { currenciesList, isFetching } = wallet;
    const {
      expenseValue,
      expenseDescription,
      currency,
      paymentMethod,
      expenseTag,
    } = this.state;
    return (
      <div>
        {isFetching && (!currenciesList || currenciesList.length) ? <p>Carregando...</p>
          : (
            <form id="addNewExpenseForm">
              <h2>Adicionar Nova Despesa</h2>
              { this.renderExpenseValueInput(expenseValue) }
              <br />
              { this.renderExpenseDescriptionInput(expenseDescription) }
              <br />
              { this.renderCurrencySelect(currenciesList, currency) }
              <br />
              { this.renderPaymentMethodSelect(paymentMethod) }
              <br />
              { this.renderExpenseTagSelect(expenseTag) }
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

Formulario.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
    currencies: PropTypes.arrayOf.isRequired,
    currenciesList: PropTypes.arrayOf.isRequired,
    error: PropTypes.string,
    isFetching: PropTypes.bool,
  }).isRequired,
  apiCurrenciesDispatch: PropTypes.func.isRequired,
  updateExpensesDataDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
