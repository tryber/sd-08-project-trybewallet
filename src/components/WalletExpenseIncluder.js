import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addCurrenciesAction,
  addExpenseAction,
} from '../actions';

const INITIAL_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
};

const tagList = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const methodList = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

class WalletExpenseIncluder extends React.Component {
  constructor() {
    super();

    this.state = {
      ...INITIAL_STATE,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
  }

  async componentDidMount() {
    const { addCurrenciesOnState } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => {
        response.json()
          .then((data) => addCurrenciesOnState(data));
      });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {
      addExpenseOnState,
      currencies,
    } = this.props;
    const { value, description, currency, method, tag, id } = this.state;
    const newExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    this.setState({
      ...INITIAL_STATE,
      id: id + 1,
    });
    addExpenseOnState(newExpense);
  }

  renderCurrencies() {
    let { currencies } = this.props;
    currencies = Object.keys(currencies);
    return (
      <select
        id="currency-input"
        name="currency"
        data-testid="currency-input"
        onChange={ this.handleChange }
      >
        {currencies.map((e) => {
          if (e === 'USDT') return '';
          return (
            <option key={ e } data-testid={ e }>{e}</option>
          );
        })}
      </select>
    );
  }

  render() {
    return (
      <form>
        <label htmlFor="value">
          {'Valor: '}
          <input
            onChange={ this.handleChange }
            name="value"
            type="number"
            step="0.1"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency">
          {'Moeda: '}
          {this.renderCurrencies()}
        </label>
        <label htmlFor="method">
          {'Forma de Pagamento: '}
          <select name="method" data-testid="method-input" onChange={ this.handleChange }>
            {methodList.map((e) => <option key={ e } value={ e }>{e}</option>)}
          </select>
        </label>
        <label htmlFor="tag">
          {'Tag: '}
          <select name="tag" data-testid="tag-input" onChange={ this.handleChange }>
            {tagList.map((tag) => <option key={ tag } value={ tag }>{tag}</option>)}
          </select>
        </label>
        <label htmlFor="description">
          {'Descrição: '}
          <input
            onChange={ this.handleChange }
            name="description"
            type="text"
            maxLength="25"
            data-testid="description-input"
          />
        </label>
        <button type="submit" onClick={ this.handleSubmit }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrenciesOnState: (currencies) => dispatch(addCurrenciesAction(currencies)),
  addExpenseOnState: (expense) => dispatch(addExpenseAction(expense)),
});

WalletExpenseIncluder.propTypes = {
  addCurrenciesOnState: PropTypes.func.isRequired,
  addExpenseOnState: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpenseIncluder);
