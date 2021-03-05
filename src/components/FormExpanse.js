import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExpense } from '../actions/Wallet';

const methodsPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

const expenseTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const INITIAL_STATE = {
  value: '',
  description: '',
  method: 'Dinheiro',
  currency: 'USD',
  tag: 'Alimentação',

};

class FormExpanse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { addExpense } = this.props;
    addExpense(this.state);
    this.setState({
      ...INITIAL_STATE,
    });
  }

  valueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          data-testid="value-input"
          id="value-input"
          type="number"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  descriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          data-testid="description-input"
          id="description-input"
          type="text"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  currencyInput() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          data-testid="currency-input"
          id="currency-input"
          value={ currency }
          name="currency"
          onChange={ this.handleChange }
        >
          {currencies.map((code) => (
            <option value={ code } data-testid={ code } key={ code }>
              { code }
            </option>
          ))}
        </select>
      </label>
    );
  }

  methodInput() {
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          data-testid="method-input"
          id="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          { methodsPayment.map((methodPayment, index) => (
            <option key={ index } value={ methodPayment }>{ methodPayment }</option>
          ))}
        </select>
      </label>
    );
  }

  tagsInput() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag-input">
        Tag:
        <select
          data-testid="tag-input"
          id="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          { expenseTags.map((expenseTag, index) => (
            <option key={ index } value={ expenseTag }>{ expenseTag }</option>
          ))}
        </select>
      </label>
    );
  }

  render() {
    return (
      <form>
        { this.valueInput() }
        { this.descriptionInput() }
        { this.currencyInput() }
        { this.methodInput() }
        { this.tagsInput() }
        <button
          type="button"
          onClick={ this.handleSubmit }

        >
          Adicionar despesa
        </button>
      </form>);
  }
}

FormExpanse.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(fetchExpense(expense)),

});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpanse);
