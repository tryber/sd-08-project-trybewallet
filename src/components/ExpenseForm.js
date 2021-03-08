import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as WalletActions } from '../actions/wallet';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };

    this.paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    this.expenseTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleAddExpense() {
    const { addExpenseWithCurrencies } = this.props;
    addExpenseWithCurrencies(this.state);
    this.setState({ ...INITIAL_STATE });
  }

  renderValueInput(value) {
    return (
      <input
        type="number"
        value={ value }
        name="value"
        data-testid="value-input"
        onChange={ this.handleChange }
        placeholder="valor"
      />
    );
  }

  renderDescriptionInput(description) {
    return (
      <input
        type="text"
        value={ description }
        name="description"
        data-testid="description-input"
        onChange={ this.handleChange }
        placeholder="descrição da despesa"
      />
    );
  }

  renderCurrencySelect(currency) {
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
            {currencyCode}
          </option>
        ))}
      </select>
    );
  }

  renderMethodSelect(method) {
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
          >
            { currentMethod}
          </option>
        ))}
      </select>
    );
  }

  renderTagSelect(tag) {
    return (
      <select
        name="tag"
        value={ tag }
        data-testid="tag-input"
        onChange={ this.handleChange }
      >
        { this.expenseTags.map((currentTag) => (
          <option key={ currentTag } value={ currentTag }>{ currentTag }</option>
        ))}
      </select>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        { this.renderValueInput(value) }
        { this.renderDescriptionInput(description) }
        { this.renderCurrencySelect(currency) }
        { this.renderMethodSelect(method) }
        { this.renderTagSelect(tag) }
        <button
          type="button"
          onClick={ this.handleAddExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpenseWithCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
