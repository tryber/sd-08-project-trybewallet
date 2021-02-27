import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  addExpense as addExpenseAction,
  fetchCurrencies as fetchCurrenciesAction,
} from '../actions';

class ExpensesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { addExpense } = this.props;
    const apiResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const apiJson = await apiResponse.json();
    this.setState({ exchangeRates: apiJson }, () => {
      this.setState((previousState) => ({
        id: previousState.id + 1,
        value: 0,
      }));
      addExpense(this.state);
    });
  }

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

  renderSelect(name, attribute, state, options) {
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
        { this.renderInput('Valor:', 'value', value) }
        { this.renderInput('Descrição:', 'description', description) }
        { !loading && this.renderSelect('Moeda:', 'currency', currency, currencies) }
        { this.renderSelect('Método de pagamento:', 'method', method, paymentMethods) }
        { this.renderSelect('Categoria da Despesa:', 'tag', tag, expenseTags) }
        <button onClick={ this.handleClick } type="submit">Adicionar Despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.wallet.isFetching,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (payload) => dispatch(addExpenseAction(payload)),
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

ExpensesForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ExpensesForm.defaultProps = {
  loading: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
