import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectCategoryTag from './SelectCategoryTag';
import SelectCurrencies from './SelectCurrencies';
import SelectMethodPayment from './SelectMethodPayment';
import { fetchApiCurrencies, saveExpense } from '../actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      methodPayment: 'Dinheiro',
      categoryTag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
  }

  handleChange(target) {
    this.setState({ [target.name]: target.value });
  }

  async saveExpense() {
    const { saveExpenseAction, expenses } = this.props;
    const { value, description, currency, methodPayment, categoryTag } = this.state;

    const currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await currencies.json();

    const id = expenses.length;
    const expense = {
      id,
      value,
      description,
      currency,
      method: methodPayment,
      tag: categoryTag,
      exchangeRates,
    };
    saveExpenseAction(expense);
    this.handleChange({
      name: 'value',
      value: 0,
    });
  }

  render() {
    const { value, description, currency, methodPayment, categoryTag } = this.state;
    return (
      <div>
        <form>
          Valor da despesa
          <input
            type="number"
            name="value"
            data-testid="value-input"
            onChange={ (event) => this.handleChange(event.target) }
            value={ value }
          />
          Descrição da despesa
          <input
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ (event) => this.handleChange(event.target) }
            value={ description }

          />
          <SelectCurrencies
            value={ currency }
            onChange={ (event) => this.handleChange(event.target) }
          />
          <SelectMethodPayment
            value={ methodPayment }
            onChange={ (event) => this.handleChange(event.target) }
          />
          <SelectCategoryTag
            value={ categoryTag }
            onChange={ (event) => this.handleChange(event.target) }
          />
        </form>
        <button
          type="button"
          onClick={ this.saveExpense }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  saveExpenseAction: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => (
  {
    expenses: state.wallet.expenses,
    currencies: state.wallet.currencies,
  }
);

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchApiCurrencies()),
  saveExpenseAction: (expense) => dispatch(saveExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
