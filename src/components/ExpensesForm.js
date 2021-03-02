import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from './Select';
import SelectTag from './SelectTag';
import { currentExpense } from '../actions/expenses';

class ExpensesForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchExchange = this.fetchExchange.bind(this);
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
  }

  fetchExchange() {
    const { id, value, description, currency, method, tag } = this.state;
    const { addExpense } = this.props;
    return (
      fetch('https://economia.awesomeapi.com.br/json/all')
        .then((data) => data.json())
        .then((response) => {
          const expense = {
            id,
            value,
            currency,
            method,
            tag,
            description,
            exchangeRates: response,
          };
          addExpense(expense);
          this.setState({
            id: id + 1,
            value: '',
            currency: '',
            method: '',
            tag: '',
            description: '',
          });
        })
    );
  }

  render() {
    const { value, description, currency, tag, method } = this.state;
    return (
      <form>
        <label htmlFor="amount">
          <input
            type="text"
            data-testid="value-input"
            id="value"
            value={ value }
            onChange={ (e) => this.handleChange(e) }
          />
          Valor da Despesa
        </label>
        <label htmlFor="description">
          <input
            type="text"
            data-testid="description-input"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
          Descrição
        </label>
        <label htmlFor="method">
          <select
            data-testid="method-input"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <Select value={ currency } onChange={ this.handleChange } name="currency" />
        <SelectTag value={ tag } onChange={ this.handleChange } />
        <button type="button" onClick={ this.fetchExchange }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (value) => dispatch(currentExpense(value)),
});

ExpensesForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpensesForm);
