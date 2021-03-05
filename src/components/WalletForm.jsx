import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchAPI from '../API';
import './WalletForm.css';
import {
  requestCurrencies as requestCurrenciesAction,
  addExpense as addExpenseAction } from '../actions/wallet';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    const INITIAL_STATE = {
      value: '10',
      description: 'Dez Dólares',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };

    this.state = { ...INITIAL_STATE };

    this.handleChange = this.handleChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderCurrenciesOptions = this.renderCurrenciesOptions.bind(this);
    this.renderPaymentOptions = this.renderPaymentOptions.bind(this);
    this.renderTagOptions = this.renderTagOptions.bind(this);
    this.renderAddButton = this.renderAddButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { requestCurrencies } = this.props;
    requestCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick(e) {
    e.preventDefault();
    const {
      id, value, description, method, tag, currency } = this.state;
    const { addExpense } = this.props;
    const exchangeRates = await fetchAPI();
    const newExpense = {
      id, value, description, method, tag, currency, exchangeRates,
    };
    addExpense(newExpense);
    this.setState((prevState) => ({
      ...prevState, id: prevState.id + 1, value: '', description: '',
    }));
  }

  renderForm() {
    const { value } = this.state;
    const rendersFunctions = [this.renderCurrenciesOptions(),
      this.renderPaymentOptions(),
      this.renderTagOptions(),
      this.renderAddButton()];
    return (
      <div>
        <label htmlFor="value">
          Valor da despesa:
          <input
            name="value"
            data-testid="value-input"
            type="number"
            value={ value }
            placeholder="Digite o valor da despesa"
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="description">
          Descrição da despesa:
          <input
            name="description"
            data-testid="description-input"
            type="text"
            placeholder="Digite uma descrição para a despesa"
            onChange={ this.handleChange }
            required
          />
        </label>
        {(
          rendersFunctions.map((render, index) => <div key={ index }>{render}</div>)
        )}
      </div>
    );
  }

  renderCurrenciesOptions() {
    const { currencies } = this.props;
    const coins = currencies.map((currency) => (
      <option key={ currency } data-testid={ currency }>
        {currency}
      </option>));
    return (
      <label htmlFor="currency-input">
        Em:
        <select
          name="currency"
          id="currency-input"
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          {coins}
        </select>
      </label>
    );
  }

  renderPaymentOptions() {
    const paymentOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          id="method-input"
          name="method"
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          {paymentOptions.map((option) => <option key={ option }>{option}</option>)}
        </select>
      </label>
    );
  }

  renderTagOptions() {
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="tag-input">
        Motivo da despesa (TAG):
        <select
          name="tag"
          id="tag-input"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          {tagOptions.map((option) => <option key={ option }>{option}</option>)}
        </select>
      </label>
    );
  }

  renderAddButton() {
    return <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>;
  }

  render() {
    const { loading } = this.props;
    return (
      <section
        className="wallet-form"
      >
        {loading ? <h1>Loading...</h1> : this.renderForm()}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  expenseId: state.wallet.expenseId,

});

const mapDispatchToProps = (dispatch) => ({
  requestCurrencies: () => dispatch(requestCurrenciesAction()),
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  requestCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.object),
  // expenseId: PropTypes.number.isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
  // expenses: [],
  loading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
