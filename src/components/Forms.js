import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  newExpense as newExpenseAction,
  fetchCurrencies as fetchCurrenciesAction,
} from '../actions';

const INITIAL_STATE = {
  id: 0,
  description: '',
  currency: 'USD',
  value: 0,
  tag: 'Lazer',
  method: 'Dinheiro',
  // exchangeRates: {},
};

class Forms extends React.Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSelectCurrency = this.renderSelectCurrency.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  async handleClick(e) {
    e.preventDefault();

    const { newExpense } = this.props;
    const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resultJson = await responseAPI.json();

    this.setState({ exchangeRates: resultJson }, () => {
      newExpense(this.state);
      this.setState((previous) => ({
        id: previous.id + 1,
        ...this.initialState,
      }));
    });
  }

  // renderCurrencyOptions() {
  //   const { currencies } = this.props;
  //   return Object.keys(currencies[0]).filter((currency) => currency !== 'USDT');
  // }

  renderInput(name, attribute, state) {
    return (
      <label htmlFor={ attribute }>
        { name }
        <input
          data-testid={ `${attribute}-input` }
          id={ attribute }
          onChange={ this.handleChange }
          type="text"
          value={ state }
        />
      </label>
    );
  }

  renderSelectCurrency(name, attribute, state, options) {
    return (
      <label htmlFor={ attribute }>
        { name }
        <select
          data-testid={ `${attribute}-input` }
          id={ attribute }
          name={ attribute }
          onChange={ this.handleChange }
          value={ state }
        >

          <option disabled>Selecione</option>

          { options.map((option) => (
            <option
              data-testid={ option }
              key={ option }
              value={ option }
            >
              { option }
            </option>
          ))}
        </select>
      </label>
    );
  }

  render() {
    const { loading, currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const expenseTags = ['Lazer', 'Alimentação', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        { this.renderInput('Descrição', 'description', description) }
        { this.renderInput('Valor', 'value', value) }
        { this.renderSelectCurrency('Categoria da Despesa', 'tag', tag, expenseTags) }
        { this.renderSelectCurrency('Método de pagamento',
          'method', method, paymentMethods) }

        { !loading && this.renderSelectCurrency(
          'Moeda', 'currency', currency, currencies,
        ) }

        <button onClick={ this.handleClick } type="submit">
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.wallet.isFetching,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  newExpense: (payload) => dispatch(newExpenseAction(payload)),
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

Forms.propTypes = {
  newExpense: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Forms);
