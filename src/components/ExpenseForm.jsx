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
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  async handleClick() {
    const { id, value, currency, method, tag, description } = this.state;
    const { addExpenseToArray } = this.props;
    const exchangeRates = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    const expense = {
      id, value, currency, method, tag, description, exchangeRates,
    };
    addExpenseToArray(expense);
    this.setState({
      id: id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  renderCurrencies() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <select
        data-testid="currency-input"
        value={ currency }
        onChange={ (e) => this.setState({ currency: e.target.value }) }
      >
        <option value="" disabled hidden> </option>
        {currencies.map((element, index) => (
          <option
            key={ index }
            data-testid={ element.code }
            value={ element.code }
          >
            {element.code}
          </option>
        ))}
      </select>
    );
  }

  renderPaymentMethod() {
    const { method } = this.state;
    return (
      <select
        data-testid="method-input"
        value={ method }
        onChange={ (e) => this.setState({ method: e.target.value }) }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  renderTag() {
    const { tag } = this.state;
    return (
      <select
        data-testid="tag-input"
        value={ tag }
        onChange={ (e) => this.setState({ tag: e.target.value }) }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
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
  currencies: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  addExpenseToArray: PropTypes.func.isRequired,
};

ExpenseForm.defaultProps = {
  currencies: [],
  isFetching: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
