import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies as fetchCurrenciesThunk,
  walletAddExpenseAction as walletAddExpense } from '../walletActions';
import fetchApi from '../api';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  selectCurrency(value) {
    const { currencies } = this.props;
    return (
      <label htmlFor="currency-input">
        <select
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ value }
          name="currency"
        >
          { currencies.map((curr) => (
            curr !== 'USDT' ? (
              <option key={ curr } data-testid={ curr }>
                { curr }
              </option>) : ''))}
        </select>
      </label>
    );
  }

  selectMethod(value) {
    return (
      <label htmlFor="method-input">
        <select
          data-testid="method-input"
          value={ value }
          name="method"
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  selectTag(value) {
    return (
      <label htmlFor="tag-input">
        <select
          data-testid="tag-input"
          onChange={ this.handleChange }
          value={ value }
          name="tag"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  async addExpense(event) {
    event.preventDefault();
    const { value, description, currency, method, tag, id } = this.state;
    const { walletAddExpenseAction } = this.props;
    const exchangeRates = await fetchApi();
    const newExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    console.log(newExpense);
    walletAddExpenseAction(newExpense);
    this.setState((prevState) => ({ id: prevState.id + 1 }));
  }

  addExpenseButton() {
    return (
      <button
        type="submit"
        onClick={ this.addExpense }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { currency, method, tag } = this.state;
    const { currencies, isLoading } = this.props;
    return (
      <>
        <label htmlFor="value-input">
          Valor da despesa:
          <input
            type="text"
            data-testid="value-input"
            onChange={ this.handleChange }
            name="value"
          />
        </label>
        <label htmlFor="description-input">
          Descrição da Despesa:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        { isLoading ? <p>Loading</p> : this.selectCurrency(currency, currencies) }
        { this.selectMethod(method) }
        { this.selectTag(tag) }
        { this.addExpenseButton() }

      </>
    );
  }
}

const mapStateToProps = ({ wallet: { isLoading, currencies } }) => ({
  isLoading,
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(
    fetchCurrenciesThunk(),
  ),
  walletAddExpenseAction: (expense) => dispatch(
    walletAddExpense(expense),
  ),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf().isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  walletAddExpenseAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
