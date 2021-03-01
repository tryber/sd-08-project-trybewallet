import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { exchangeFetchingAPI, expensesObject } from '../actions/index';
import Table from '../components/table';

import './wallet.css';

class Wallet extends React.Component {
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

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  buttonSubmit() {
    const { expenses } = this.props;
    const { id } = this.state;
    expenses(this.state);
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  methodInput() {
    const { method } = this.state;
    return (
      <label htmlFor="method" className="payment-drop">
        Metodo de pagamento:
        <select
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
          id="method"
          value={ method }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  tagInput() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag" className="tag-drop">
        Tag:
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
          id="tag"
          value={ tag }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  currencyInput() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency" className="coin-drop">
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
          id="currency"
          value={ currency }
        >
          { currencies
            .map((coin) => (
              <option
                key={ coin.code }
                data-testid={ coin.code }
              >
                {coin.code}
              </option>
            ))}
        </select>
      </label>
    );
  }

  total(store) {
    if (store.length !== 0) {
      const mult = [];
      mult.push(store
        .map((order) => order.value * order.exchangeRates[order.currency].ask));
      const total = mult[0].reduce((acc, pvv) => acc + pvv);
      return <p data-testid="total-field">{total.toFixed(2)}</p>;
    }

    return <p data-testid="total-field">0</p>;
  }

  render() {
    const { email, expensesStore } = this.props;
    const { value, description } = this.state;
    return (
      <>
        <header className="header">
          <p data-testid="email-field">{`Email: ${email}`}</p>
          { this.total(expensesStore) }
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form className="forms">
          <label htmlFor="value" className="input-value">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              name="value"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="description" className="input-description">
            Descrição:
            <input
              type="text"
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          { this.currencyInput() }
          { this.methodInput() }
          { this.tagInput() }
          <button
            type="button"
            className="button-submit"
            onClick={ () => this.buttonSubmit() }
          >
            Adicionar despesa
          </button>
        </form>
        <Table expenses={ expensesStore } />
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  expensesStore: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAPI: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
  currencies: state.wallet.currencies,
  expensesStore: state.wallet.expenses,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(
    exchangeFetchingAPI(),
  ),
  expenses: (state) => dispatch(
    expensesObject(state),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
