import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addExpense } from '../../actions';

const INITIAL_CLASS_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  payMethod: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = { ...INITIAL_CLASS_STATE, availableId: 0 };

    this.addNewExpense = this.addNewExpense.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.createCurrencySelectionField = this.createCurrencySelectionField.bind(this);
  }

  onFieldChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async addNewExpense() {
    const { createExpense } = this.props;
    const { currency, description, payMethod, tag, value, availableId } = this.state;
    const currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await currencies.json();

    const expense = {
      id: availableId,
      value,
      description,
      currency,
      method: payMethod,
      tag,
      exchangeRates,
    };

    createExpense(expense);

    this.setState({ ...INITIAL_CLASS_STATE, availableId: availableId + 1 });
  }

  createCurrencySelectionField() {
    const { availableCurrencies } = this.props;
    const { currency: currencyState } = this.state;

    return (
      <select
        data-testid="currency-input"
        name="currency"
        value={ currencyState }
        onChange={ this.onFieldChange }
      >
        {availableCurrencies.map((currency, index) => (
          <option
            key={ index }
            data-testid={ currency }
            value={ currency }
          >
            {currency}
          </option>
        ))}
      </select>
    );
  }

  render() {
    const { description, payMethod, tag, value } = this.state;

    return (
      <form>
        <input
          type="number"
          data-testid="value-input"
          placeholder="Valor"
          name="value"
          onChange={ this.onFieldChange }
          value={ value }
        />
        <input
          type="text"
          data-testid="description-input"
          placeholder="Descrição"
          name="description"
          onChange={ this.onFieldChange }
          value={ description }
        />
        {this.createCurrencySelectionField()}
        <select
          data-testid="method-input"
          name="payMethod"
          value={ payMethod }
          onChange={ this.onFieldChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.onFieldChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button" onClick={ this.addNewExpense }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createExpense: (expense) => dispatch(addExpense(expense)),
});

ExpenseForm.propTypes = {
  availableCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  createExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpenseForm);
