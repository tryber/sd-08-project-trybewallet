import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { responseCurrencies, newExpenseSave as newExpenseAdd } from '../actions';

import fetchApiCurrencies from '../services';

const INITIAL_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
  total: '0.00',
};

class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE,

    };
    this.onChangeInputs = this.onChangeInputs.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
  }

  componentDidMount() {
    const { currenciesRequest } = this.props;
    currenciesRequest();
  }

  onChangeInputs(field, newValue) {
    this.setState({ [field]: newValue });
  }

  async submitExpense() {
    const { value, description, currency, method, tag, id, total } = this.state;
    const { newExpenseSave } = this.props;
    const exchangeRates = await fetchApiCurrencies();

    const newExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    newExpenseSave(newExpense);

    function valueCambio() {
      const sum = (parseFloat(value) * (exchangeRates[currency].ask)) + parseFloat(total);
      return sum.toFixed(2);
    }
    console.log(exchangeRates[currency].ask);
    this.setState({
      ...INITIAL_STATE,
      id: id + 1,
      total: valueCambio(),
    });
  }

  renderHeader() {
    const { total } = this.state;
    const { email } = this.props;
    return (

      <header>
        <p data-testid="email-field">
          {email}
        </p>
        <p data-testid="total-field">{total}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>

    );
  }

  renderValue() {
    const { value } = this.state;
    return (
      <div>
        Valor
        <input
          value={ value }
          type="number"
          data-testid="value-input"
          onChange={ (event) => this.onChangeInputs('value', event.target.value) }
        />

      </div>
    );
  }

  renderDescrip() {
    return (
      <div>
        Descrição
        <input
          defaultValue=""
          data-testid="description-input"
          onChange={ (event) => this.onChangeInputs('description', event.target.value) }
        />

      </div>

    );
  }

  renderCambio() {
    const { currencies } = this.props;
    const dropDownCurrencies = Object.keys(currencies || {});

    return (

      <div>

        Moeda/Cambio
        <select
          data-testid="currency-input"
          onChange={ (event) => this.onChangeInputs('currency', event.target.value) }
        >
          {dropDownCurrencies.map((currency) => {
            if (currency === 'USDT') return;
            return (
              <option key={ currency } data-testid={ currency }>{currency}</option>
            );
          })}
        </select>

      </div>

    );
  }

  render() {
    return (
      <span>
        { this.renderHeader()}
        { this.renderValue()}
        { this.renderDescrip()}
        { this.renderCambio()}
        <div>

          Método de pagamento
          <select
            data-testid="method-input"
            onChange={ (event) => this.onChangeInputs('method', event.target.value) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          Categoria
          <select
            data-testid="tag-input"
            onChange={ (event) => this.onChangeInputs('tag', event.target.value) }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button
            type="button"
            onClick={ this.submitExpense }
          >
            Adicionar despesa

          </button>
        </div>
      </span>);
  }
}

const mapStateToProps = (state) => ({

  email: state.user.email,
  currencies: state.wallet.currencies[0],
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesRequest: () => dispatch(responseCurrencies()),
  newExpenseSave: (expense) => dispatch(newExpenseAdd(expense)),

});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object),
  newExpenseSave: PropTypes.func.isRequired,
  currenciesRequest: PropTypes.func.isRequired,
};

Wallet.defaultProps = {

  currencies: {},
};
