import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addNewExpense, fetchingCurrenciesThunk } from '../actions';
import getCurrencyPrice from '../services/getCurrencyPrice';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      ...INITIAL_STATE,
    };
    this.getCurrenciesAPI = this.getCurrenciesAPI.bind(this);
    this.getCurrentCurrency = this.getCurrentCurrency.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getCurrenciesAPI();
  }

  getCurrenciesAPI() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  async getCurrentCurrency() {
    const exchangeRates = await getCurrencyPrice();
    this.setState({
      exchangeRates,
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleClick() {
    await this.getCurrentCurrency();
    const { addExpense } = this.props;
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const newExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    addExpense(newExpense);
    this.resetState();
  }

  resetState() {
    const { id } = this.state;
    this.setState({
      ...INITIAL_STATE,
      id: id + 1,
    });
  }

  renderCurrencyDropdown() {
    const { currencies } = this.props;
    return (
      <label htmlFor="input-currency">
        Moeda:
        <select
          name="currency"
          id="input-currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          {currencies.map((currencyName, index) => {
            if (currencyName === 'USDT') return '';
            return (
              <option
                key={ index }
                value={ currencyName }
                data-testid={ currencyName }
              >
                {currencyName}
              </option>);
          })}
        </select>
      </label>
    );
  }

  renderPaymentDropdown() {
    const method = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <label htmlFor="input-method">
        Método de pagamento:
        <select
          name="method"
          id="input-method"
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          {method.map((item, index) => (
            <option
              key={ index }
              value={ item }
            >
              {item}
            </option>))}
        </select>
      </label>
    );
  }

  renderTagDropdown() {
    const type = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="input-tag">
        Tag:
        <select
          name="tag"
          id="input-tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          {type.map((item) => <option key={ item } value={ item }>{item}</option>)}
        </select>
      </label>
    );
  }

  render() {
    const { value, description } = this.state;
    return (
      <form>
        <label htmlFor="input-value">
          Valor:
          <input
            type="text"
            id="input-value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="input-description">
          Descrição:
          <input
            type="text"
            id="input-description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        {this.renderCurrencyDropdown()}
        {this.renderPaymentDropdown()}
        {this.renderTagDropdown()}
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchingCurrenciesThunk()),
  addExpense: (expense) => dispatch(addNewExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

ExpenseForm.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpense: PropTypes.func.isRequired,
};
