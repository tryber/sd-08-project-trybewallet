import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { responseCurrencies,
  newExpenseSave as newExpenseAdd,
  removeExpense as deleteExpense } from '../actions';
import Header from './Header';
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

  renderTitleHeader() {
    return (
      <tr>
        <td>Descrição</td>
        <td>Tag</td>
        <td>Método de pagamento</td>
        <td>Valor</td>
        <td>Moeda</td>
        <td>Câmbio utilizado</td>
        <td>Valor convertido</td>
        <td>Moeda de conversão</td>
        <td>Editar/Excluir</td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    const { removeExpense } = this.props;
    return (
      <span>
        <tr>
          <td><Header /></td>
          <td>{ this.renderValue()}</td>
          <td>{ this.renderDescrip()}</td>
          <td>{ this.renderCambio()}</td>
          <td>{ this.renderMethod()}</td>
          <td>{ this.rendertag()}</td>
          <td>{ this.renderBtt()}</td>
        </tr>
        {this.renderTitleHeader()}
        {expenses.map((expense, index) => {
          const { description, tag, method, value, currency, exchangeRates } = expense;
          const { name, ask } = exchangeRates[currency];
          return (
            <tr key={ index }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{name}</td>
              <td>{parseFloat(ask).toFixed(2)}</td>
              <td>{(ask * value).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => removeExpense(expense) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        })}
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
  removeExpense: (expense) => dispatch(deleteExpense(expense)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.object),
  newExpenseSave: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
  currenciesRequest: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  currencies: {},
};
