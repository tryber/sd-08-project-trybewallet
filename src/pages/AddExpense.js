import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { responseCurrencies,
  newExpenseSave as newExpenseAdd,
  removeExpense as deleteExpense } from '../actions';
import fetchApiCurrencies from '../services';

const INITIAL_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
  /* total: '0.00', */
};

class AddExpense extends Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE,
    };
    this.onChangeInputs = this.onChangeInputs.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
  }

  onChangeInputs(field, newValue) {
    this.setState({ [field]: newValue });
  }

  async submitExpense() {
    const { newExpenseSave } = this.props;
    const { value, description, currency, method, tag, id, total } = this.state;

    const exchangeRates = await fetchApiCurrencies();
    const newExpense = { id,
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

    this.setState({
      ...INITIAL_STATE,
      id: id + 1,
      total: valueCambio(),
    });
  }

  renderValue() {
    const { value } = this.state;
    return (
      <div>
        R$ Valor
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
        Descrição da despesa
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

    return (
      <div>
        Moeda/Cambio
        <select
          data-testid="currency-input"
          onChange={ (event) => this.onChangeInputs('currency', event.target.value) }
        >
          {currencies.map((currency) => {
            if (currency === 'USDT') return;
            return (
              <option key={ currency } data-testid={ currency }>{currency}</option>
            );
          })}
        </select>
      </div>
    );
  }

  renderMethod() {
    return (
      <div>

        Forma de pagamento
        <select
          data-testid="method-input"
          onChange={ (event) => this.onChangeInputs('method', event.target.value) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </div>
    );
  }

  rendertag() {
    return (
      <div>
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

      </div>
    );
  }

  renderBtt() {
    return (
      <div>
        <button
          type="button"
          onClick={ this.submitExpense }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }

  render() {
    return (
      <>
        <td>{ this.renderValue()}</td>
        <td>{ this.renderDescrip()}</td>
        <td>{ this.renderCambio()}</td>
        <td>{ this.renderMethod()}</td>
        <td>{ this.rendertag()}</td>
        <td>{ this.renderBtt()}</td>
      </>);
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesRequest: () => dispatch(responseCurrencies()),
  newExpenseSave: (expense) => dispatch(newExpenseAdd(expense)),
  removeExpense: (expense) => dispatch(deleteExpense(expense)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
AddExpense.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.string),
  newExpenseSave: PropTypes.func.isRequired,

};

AddExpense.defaultProps = {
  currencies: {},
};
