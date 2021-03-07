import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './MenuWallet.css';
import {
  fetchAPI,
  getExpensesWithCoins,
} from '../actions/wallet';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class MenuWallet extends Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE,

    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleAddExpenses() {
    const { expensesWithCoins } = this.props;
    expensesWithCoins(this.state);
    this.setState({
      ...INITIAL_STATE,
    });
  }

  renderMethodAndTagsSelects() {
    const { method, tag } = this.state;

    return (
      <>
        <label
          htmlFor="method-input"
          data-testid="method-input"
          className="value-paymemt-method-label"
        >
          Método de Pagamento:
          <select
            value={ method }
            name="method"
            onChange={ this.handleChange.bind(this) }
            id="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label
          htmlFor="select"
          data-testid="tag-input"
          className="value-tag-label"
        >
          Tag:
          <select
            value={ tag }
            name="tag"
            onChange={ this.handleChange.bind(this) }
            id="select"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </>
    );
  }

  renderSelectsCurrencies() {
    const { currency } = this.state;

    const { currencies } = this.props;
    const coins = currencies.map(
      (item, index) => item[0] !== 'USDT' && (
        <option data-testid={ item[0] } key={ index } value={ item[0] }>
          {item[1].code}
        </option>
      ),
    );
    return (
      <>
        <label
          htmlFor="currency-input"
          data-testid="currency-input"
          className="value-coin-label"
        >
          Moeda:
          <select
            value={ currency }
            name="currency"
            onChange={ this.handleChange.bind(this) }
            id="currency-input"
          >
            {coins}
          </select>
        </label>
        {this.renderMethodAndTagsSelects()}
      </>
    );
  }

  render() {
    const { value, description } = this.state;
    return (
      <form>
        <div className="menu-wallet">
          <label className="value-input-label" htmlFor="value-input">
            Valor:
            <input
              name="value"
              value={ value }
              onChange={ this.handleChange.bind(this) }
              id="value"
              data-testid="value-input"
              type="text"
              className="value-input"
            />
          </label>
          {this.renderSelectsCurrencies()}

          <label
            htmlFor="description-input"
            className="value-description-label"
          >
            Descrição:
            <textarea
              value={ description }
              name="description"
              onChange={ this.handleChange.bind(this) }
              id="description-input"
              data-testid="description-input"
              className="value-input"
            />
          </label>
          <div className="add-expenses-button">
            <button
              onClick={ this.handleAddExpenses.bind(this) }
              type="button"
              className="add-expenses"
            >
              Adicionar despesa
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses, total } }) => ({
  currencies,
  expenses,
  total,
});
const mapDispatchToProps = (dispatch) => ({
  getdata: (getCurrencies) => dispatch(fetchAPI(getCurrencies)),
  expensesWithCoins: (expenses) => dispatch(getExpensesWithCoins(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuWallet);
MenuWallet.propTypes = {
  currencies: PropTypes.objectOf.isRequired,
  expensesWithCoins: PropTypes.func.isRequired,
};
