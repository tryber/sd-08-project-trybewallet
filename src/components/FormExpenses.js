import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import selectFields from '../Database/selectFields';
import { addExpense, fetchCurrencies, newCurrencyID } from '../actions';
import './FormExpenses.css';

class FormExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formControl: {
        value: '0',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      },
    };
    this.renderSelectF = this.renderSelectF.bind(this);
    this.renderListOptions = this.renderListOptions.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.renderCurrenciesOptions = this.renderCurrenciesOptions.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  handleAddExpense() {
    const {
      propAddExpense, propFetchCurrencies, propNewCurrencyID, UID, currencies,
    } = this.props;
    const { formControl: {
      value,
      currency,
      method,
      tag,
      description,
    } } = this.state;
    propFetchCurrencies();

    const expenseObj = {
      id: UID,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    propAddExpense(expenseObj);
    propNewCurrencyID();
  }

  handleInput(type, { value }) {
    this.setState((p) => ({
      formControl: { ...p.formControl, [type]: value },
    }));
  }

  renderListOptions(arraySelect) {
    return arraySelect.map((e) => (
      <option key={ e } value={ e }>{e}</option>
    ));
  }

  renderCurrenciesOptions(arraySelect) {
    return arraySelect.map(({ code, codein }) => codein === 'BRL'
    && <option key={ code } value={ code } data-testid={ code }>{code}</option>);
  }

  renderSelectF() {
    const { payMethods, payTags } = selectFields;
    const { formControl: { currency, method, tag } } = this.state;
    const { currencies } = this.props;
    return (
      <div className="selects-column">
        <label htmlFor="currencyInput">
          <span>Moeda:</span>
          <select
            id="currencyInput"
            name="currencyInput"
            data-testid="currency-input"
            value={ currency }
            onChange={ ({ target }) => this.handleInput('currency', target) }
          >
            {this.renderCurrenciesOptions(currencies)}
          </select>
        </label>
        <label htmlFor="methodInput">
          <span>Método de pagamento:</span>
          <select
            id="methodInput"
            name="methodInput"
            data-testid="method-input"
            value={ method }
            onChange={ ({ target }) => this.handleInput('method', target) }
          >
            {this.renderListOptions(payMethods)}
          </select>
        </label>
        <label htmlFor="tagInput">
          <span>Tag:</span>
          <select
            id="tagInput"
            name="tagInput"
            data-testid="tag-input"
            value={ tag }
            onChange={ ({ target }) => this.handleInput('tag', target) }
          >
            {this.renderListOptions(payTags)}
          </select>
        </label>
      </div>
    );
  }

  render() {
    const { formControl: { value, description } } = this.state;
    return (
      <form className="form-expenses">
        <label htmlFor="valueInput">
          <span>Valor:</span>
          <input
            type="number"
            name="valueInput"
            id="valueInput"
            data-testid="value-input"
            value={ value }
            onChange={ ({ target }) => this.handleInput('value', target) }
          />
        </label>
        {this.renderSelectF()}
        <label htmlFor="descriptionInput">
          <span>Descrição:</span>
          <textarea
            name="descriptionInput"
            id="descriptionInput"
            cols="20"
            rows="2"
            data-testid="description-input"
            value={ description }
            onChange={ ({ target }) => this.handleInput('description', target) }
          />
        </label>
        <button type="button" onClick={ this.handleAddExpense }>Adicionar Despesa</button>
      </form>
    );
  }
}

function mapStateToProps({ wallet }) {
  return {
    currencies: wallet.currencies,
    UID: wallet.expenseUID,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    propFetchCurrencies: () => dispatch(fetchCurrencies()),
    propNewCurrencyID: () => dispatch(newCurrencyID()),
    propAddExpense: (expenseObj) => dispatch(addExpense(expenseObj)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);

FormExpenses.propTypes = {
  propFetchCurrencies: PropTypes.func.isRequired,
  propNewCurrencyID: PropTypes.func.isRequired,
  propAddExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
    ask: PropTypes.string.isRequired,
    bid: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    codein: PropTypes.string.isRequired,
    create_date: PropTypes.string.isRequired,
    high: PropTypes.string.isRequired,
    low: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pctChange: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    varBid: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  UID: PropTypes.number.isRequired,
};
