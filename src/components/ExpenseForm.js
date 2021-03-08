import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Creators as WalletActions } from '../actions/index';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    this.expenseTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { addExpenseWithCoins } = this.props;
    addExpenseWithCoins(this.state);
    this.setState({ value: '' });
  }

  renderValueInput(value) {
    return (
      <input
        type="text"
        name="value"
        value={ value }
        data-testid="value-input"
        placeholder="Valor"
        onChange={ this.handleChange }
      />
    );
  }

  renderDescriptionInput(description) {
    return (
      <input
        type="text"
        name="description"
        value={ description }
        data-testid="description-input"
        placeholder="Descrição"
        onChange={ this.handleChange }
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
            { currencyCode }
          </option>
        )) }
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
        { this.paymentMethods.map((currencyMethod) => (
          <option
            key={ currencyMethod }
            value={ currencyMethod }
          >
            { currencyMethod }
          </option>
        )) }
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
        { this.expenseTags.map((currencyTag) => (
          <option key={ currencyTag } value={ currencyTag }>{ currencyTag }</option>
        )) }
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
        <button onClick={ this.handleClick } type="button">Adicionar despesa</button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpenseWithCoins: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
