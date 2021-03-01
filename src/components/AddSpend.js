import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  // fetchCurrencies as fetchCurrenciesAction,
  addExpense as addExpenseAction,
  // totalExpenses as totalExpensesAction,
} from '../actions';
import currenciesAPI from '../services';

const INIT_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
};

class AddSpend extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INIT_STATE };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.totalExpenses = this.totalExpenses.bind(this);
  }

  // totalExpenses() {
  //   const { totalExpenses, expenses } = this.props;
  // console.log(totalExpenses);
  //   return expenses.reduce((first, next) => first.value + next.value, totalExpenses);
  // }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleClick(e) {
    e.preventDefault();
    const { value, description, currency, method, tag, id } = this.state;
    const exchangeRates = await currenciesAPI();
    const expense = { value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    };
    const { addExpense } = this.props;
    this.setState({
      ...INIT_STATE,
      id: id + 1,
    });
    addExpense(expense);
    // totalExpenses();
  }

  renderValueInput() {
    const { value } = this.state;
    return (
      <input
        data-testid="value-input"
        name="value"
        type="number"
        placeholder="0,00"
        className="input-number"
        min="0"
        onChange={ this.handleChange }
        value={ value }
      />
    );
  }

  renderDescriptionInput() {
    return (
      <input
        data-testid="description-input"
        name="description"
        type="text"
        placeholder="Description"
        onChange={ this.handleChange }
      />
    );
  }

  renderCurrencies() {
    const { currencies } = this.props;
    // currencies.splice(1, 1);
    return (
      <select data-testid="currency-input" onChange={ this.handleChange } name="currency">
        {currencies.map((currency) => {
          if (currency === 'USDT') return '';
          return (
            <option
              key={ currency }
              data-testid={ currency }
            >
              {currency}
            </option>
          );
        })}
      </select>
    );
  }

  renderPaymentMode() {
    return (
      <select data-testid="method-input" name="method" onChange={ this.handleChange }>
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
    );
  }

  renderTag() {
    return (
      <select data-testid="tag-input" name="tag" onChange={ this.handleChange }>
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>
    );
  }

  renderButtonAdd() {
    return (
      <form>
        <button
          onClick={ this.handleClick }
          type="submit"
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>{this.renderCurrencies()}</th>
            <th>{this.renderValueInput()}</th>
            <th>{this.renderPaymentMode()}</th>
            <th>{this.renderTag()}</th>
            <th>R$</th>
            <th>{this.renderDescriptionInput()}</th>
            <th>{ this.renderButtonAdd() }</th>
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  totalExpenses: state.wallet.totalExpenses,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  // fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
  // totalExpenses: (value) => dispatch(totalExpensesAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSpend);

AddSpend.propTypes = {
  currencies: PropTypes.arrayOf(String).isRequired,
  // totalExpenses: PropTypes.func,
  // expenses: PropTypes.arrayOf(PropTypes.object),
  addExpense: PropTypes.func.isRequired,
};

AddSpend.defaultProps = {
  // expenses: [],
  // totalExpenses: 0,
};
