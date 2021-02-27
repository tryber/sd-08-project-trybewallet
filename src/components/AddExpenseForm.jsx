import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, saveCurrencies, sumToExpensesTotal } from '../actions';
import fetchCurrenciesAPI from '../services/api';

class AddExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  async componentDidMount() {
    const { saveCurrenciesInStore } = this.props;
    const currencies = await fetchCurrenciesAPI();
    saveCurrenciesInStore(currencies);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async addExpense(e) {
    e.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;
    const { addExpenseToStore, updateTotal } = this.props;
    const exchangeRates = await fetchCurrenciesAPI();
    const expenseToAdd = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    const currencyPosition = Object.keys(exchangeRates).indexOf(currency);
    const quotation = Object.values(exchangeRates)[currencyPosition].ask;
    const expenseInLocalCurrency = parseFloat(value) * parseFloat(quotation);
    addExpenseToStore(expenseToAdd);
    updateTotal(expenseInLocalCurrency);
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
    const form = document.getElementById('add-expense-form');
    form.reset();
  }

  // Input "step" property found at: https://stackoverflow.com/questions/24163889/html5-input-for-money-currency4
  render() {
    const { currencies } = this.props;
    const REGULAR_CURRENCY_LENGTH = 3;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const paymentTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form id="add-expense-form">
        <input
          data-testid="value-input"
          type="number"
          name="value"
          placeholder="0"
          step="0.01"
          onChange={ this.handleChange }
        />
        <input
          data-testid="description-input"
          type="text"
          placeholder="Descrição"
          name="description"
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
        >
          {Object.keys(currencies)
            .filter((curr) => curr.length === REGULAR_CURRENCY_LENGTH)
            .map((currency) => (
              <option data-testid={ currency } key={ currency }>
                {currency}
              </option>))}
        </select>
        <select data-testid="method-input" name="method" onChange={ this.handleChange }>
          {paymentMethods.map((method) => (
            <option key={ method }>{method}</option>
          ))}
        </select>
        <select data-testid="tag-input" name="tag" onChange={ this.handleChange }>
          {paymentTags.map((tag) => (
            <option key={ tag }>{tag}</option>
          ))}
        </select>
        <button type="submit" onClick={ this.addExpense }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveCurrenciesInStore: (currencies) => dispatch(
    saveCurrencies(currencies),
  ),
  addExpenseToStore: (expenseInfos) => dispatch(
    addExpense(expenseInfos),
  ),
  updateTotal: (expenseValue) => dispatch(
    sumToExpensesTotal(expenseValue),
  ),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

AddExpenseForm.propTypes = {
  saveCurrenciesInStore: PropTypes.func.isRequired,
  currencies: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);
