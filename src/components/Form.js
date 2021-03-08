import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesAPI, saveExpense } from '../actions';
import getCurrencies from '../serviceApi';

class Form extends Component {
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

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { gCurrencies } = this.props;
    gCurrencies();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleClick(e) {
    e.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;
    const { addExpense } = this.props;
    const exchangeRates = await getCurrencies();
    const expense = { id, value, description, currency, method, tag, exchangeRates };
    addExpense(expense);
    this.setState({
      value: 0,
      id: id + 1,
    });
  }

  renderSelectCurrencies() {
    const { currency } = this.state;
    const { currencies } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          { currencies.map((curr) => {
            if (curr === 'USDT') return '';
            return (
              <option data-testid={ curr } key={ curr }>{ curr }</option>
            );
          })}
        </select>
      </label>
    );
  }

  renderSelectPayMethod() {
    const { method } = this.state;
    const payMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          {payMethod.map((met) => (<option key={ met }>{ met }</option>))}
        </select>
      </label>
    );
  }

  renderSelectTags() {
    const { tag } = this.state;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          {tags.map((tg) => (<option key={ tg }>{ tg }</option>))}
        </select>
      </label>
    );
  }

  renderValueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          id="value"
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          id="description"
          name="description"
          value={ description }
          data-testid="description-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderButton() {
    const add = 'Adicionar despesa';
    return (
      <button
        type="submit"
        className="add-expense"
        onClick={ this.handleClick }
      >
        { add }
      </button>
    );
  }

  render() {
    return (
      <form>
        { this.renderValueInput() }
        { this.renderSelectCurrencies() }
        { this.renderSelectPayMethod() }
        { this.renderSelectTags() }
        { this.renderDescriptionInput() }
        { this.renderButton() }
      </form>
    );
  }
}

Form.propTypes = {
  gCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  gCurrencies: () => dispatch(fetchCurrenciesAPI()),
  addExpense: (expense) => dispatch(saveExpense(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
