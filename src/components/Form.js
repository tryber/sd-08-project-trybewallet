import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import currenciesAPI from '../services';
import { fetchCurrencies as getCurriencies, saveExpense as addExpense } from '../actions';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
};

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE,
    };
    this.inputExpense = this.inputExpense.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
    this.selectCurrencies = this.selectCurrencies.bind(this);
    this.selectPaymentMethod = this.selectPaymentMethod.bind(this);
    this.selectCategories = this.selectCategories.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  async handleClick(e) {
    e.preventDefault();
    const { value, description, currency, method, tag, id } = this.state;
    const { saveExpense } = this.props;
    const exchangeRates = await currenciesAPI();
    saveExpense({ id, value, description, currency, method, tag, exchangeRates });
    this.setState({
      ...INITIAL_STATE,
      id: id + 1,
    });
  }

  inputExpense(value) {
    return (
      <label htmlFor="value-input">
        <input
          type="number"
          id="value-input"
          name="value"
          placeholder="Valor da despesa"
          data-testid="value-input"
          value={ value }
          onChange={ this.handleChange }
        />

      </label>
    );
  }

  inputDescription(description) {
    return (
      <label htmlFor="description-input">
        <input
          type="text"
          id="description-input"
          name="description"
          placeholder="Descrição da despesa"
          data-testid="description-input"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  selectCurrencies(currency) {
    const { currencies } = this.props;
    return (
      <select
        id="currency-input"
        name="currency"
        data-testid="currency-input"
        value={ currency }
        onChange={ this.handleChange }
      >
        {currencies.map((curr) => {
          if (curr === 'USDT') return '';
          return (
            <option key={ curr } data-testid={ curr }>
              {curr}
            </option>
          );
        })}
      </select>
    );
  }

  selectPaymentMethod(method) {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <select
        id="method-input"
        name="method"
        data-testid="method-input"
        value={ method }
        onChange={ this.handleChange }
      >
        {methods.map((m) => (
          <option key={ m } data-testid={ m }>
            { m }
          </option>
        ))}
      </select>
    );
  }

  selectCategories(tag) {
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <select
        id="tag-input"
        name="tag"
        data-testid="tag-input"
        value={ tag }
        onChange={ this.handleChange }
      >
        {tags.map((t) => (
          <option key={ t } data-testid={ t }>
            { t }
          </option>
        ))}

      </select>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        {this.inputExpense(value)}
        {this.inputDescription(description)}
        {this.selectCurrencies(currency)}
        {this.selectPaymentMethod(method)}
        {this.selectCategories(tag)}
        <button
          type="submit"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>

    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurriencies()),
  saveExpense: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveExpense: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
};
