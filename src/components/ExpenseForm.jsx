import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addExpense, fetchAPI } from '../actions';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.handleClick = this.handleClick.bind(this);
    const { getCurrencies } = props;
    getCurrencies();
    this.state = {
      id: 0,
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
    };
  }

  handleClick() {
    const { id, value, currency, method, tag, description } = this.state;
    const { currencies, addExpenseToArray } = this.props;
    const expense = {
      id, value, currency, method, tag, description, exchangeRates: currencies,
    };
    console.log(expense);
    addExpenseToArray(expense);
    this.setState({
      id: id + 1,
      value: '',
      currency: 'USD',
      method: '',
      tag: '',
      description: '',
    });
  }

  renderCurrencies() {
    const { currencies } = this.props;
    return (
      <label htmlFor="currency-input">
        Moeda
        <select
          data-testid="currency-input"
          defaultValue=""
          onChange={ (e) => this.setState({ currency: e.target.value }) }
        >
          <option value="" disabled hidden> </option>
          {currencies.map((currency) => (
            <option
              key={ currency.code }
              data-testid={ currency.code }
              value={ currency.code }
            >
              {currency.code}
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderPaymentMethod() {
    return (
      <label htmlFor="method-input">
        Método de Pagamento
        <select
          data-testid="method-input"
          onChange={ (e) => this.setState({ method: e.target.value }) }
        >
          <option value="cash">Dinheiro</option>
          <option value="credit">Cartão de crédito</option>
          <option value="debit">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTag() {
    return (
      <label htmlFor="tag-input">
        Tag
        <select
          data-testid="tag-input"
          onChange={ (e) => this.setState({ tag: e.target.value }) }
        >
          <option value="food">Alimentação</option>
          <option value="recreation">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transportation">Transporte</option>
          <option value="health">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { isFetching } = this.props;
    const { value, description } = this.state;
    if (isFetching) return <h2>Carregando...</h2>;
    return (
      <form>

        <label htmlFor="value-input">
          Valor
          <input
            type="text"
            data-testid="value-input"
            value={ value }
            onChange={ (e) => this.setState({ value: e.target.value }) }
          />
        </label>

        {this.renderCurrencies()}

        {this.renderPaymentMethod()}

        {this.renderTag()}

        <label htmlFor="description-input">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            value={ description }
            onChange={ (e) => this.setState({ description: e.target.value }) }
          />
        </label>

        <button
          type="button"
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
  isFetching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchAPI()),
  addExpenseToArray: (expense) => dispatch(addExpense(expense)),
});

ExpenseForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  addExpenseToArray: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
