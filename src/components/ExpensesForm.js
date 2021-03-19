import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { fetchSaveCurrencies as WalletActions } from '../actions/wallet';

import styles from '../styles/components/ExpensesForm.module.css';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpensesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };

    this.paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    this.expenseTags = ['Lazer', 'Alimentação', 'Trabalho', 'Transporte', 'Saúde'];

    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleAddExpense(event) {
    event.preventDefault();
    const { addExpenseWithCurrencies } = this.props;
    addExpenseWithCurrencies(this.state);
    this.setState({ ...INITIAL_STATE });
  }

  renderInputValue(value) {
    return (
      <label htmlFor="value-input">
        <input
          name="value"
          type="number"
          value={ value }
          data-testid="value-input"
          placeholder="Valor"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescriptionInput(description) {
    return (
      <label htmlFor="description-input">
        <input
          type="text"
          name="description"
          value={ description }
          data-testid="tag-input"
          placeholder="Digite a Despesa"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrencyOptions(currency) {
    const { currencies } = this.props;
    return (
      <select
        name="currency"
        value={ currency }
        data-testid="currency-input"
        onChange={ this.handleChange }
      >
        { currencies.map((currencyCode) => (
          <option
            key={ currencyCode }
            value={ currencyCode }
            data-testid={ currencyCode }
          >
            { currencyCode }
          </option>
        ))}
      </select>
    );
  }

  renderPaymentMethod(method) {
    return (
      <select
        name="method"
        value={ method }
        data-testid="method-input"
        onChange={ this.handleChange }
      >
        { this.paymentMethods.map((currentMethod) => (
          <option
            key={ currentMethod }
            value={ currentMethod }
            data-testid={ currentMethod }
          >
            { currentMethod }
          </option>
        ))}
      </select>
    );
  }

  renderSelectedTag(tag) {
    return (
      <select
        name="tag"
        value={ tag }
        data-testid="tag-input"
        onChange={ this.handleChange }
      >
        { this.expenseTags.map((currentTag) => (
          <option
            key={ currentTag }
            value={ currentTag }
          >
            { currentTag }
          </option>
        ))}
      </select>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className={ styles.expenseForm }>
        { this.renderInputValue(value) }
        { this.renderDescriptionInput(description) }
        { this.renderCurrencyOptions(currency) }
        { this.renderPaymentMethod(method) }
        { this.renderSelectedTag(tag) }
        <button
          onClick={ this.handleAddExpense }
          type="submit"
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpenseWithCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
