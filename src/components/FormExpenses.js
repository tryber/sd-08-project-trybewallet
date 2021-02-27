import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import selectFields from '../Database/selectFields';
import './FormExpenses.css';

class FormExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formControl: {
        value: '0',
        currency: '',
        payMethod: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      },
    };
    this.renderSelectF = this.renderSelectF.bind(this);
    this.renderListOptions = this.renderListOptions.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.renderCurrenciesOptions = this.renderCurrenciesOptions.bind(this);
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
    console.log(arraySelect);
  }

  renderSelectF() {
    const { payMethods, payTags } = selectFields;
    const { formControl: { currency, payMethod, tag } } = this.state;
    const { currencies } = this.props;
    return (
      <div>
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
            value={ payMethod }
            onChange={ ({ target }) => this.handleInput('payMethod', target) }
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
        <button type="button">Adicionar Despesa</button>
      </form>
    );
  }
}

function mapStateToProps({ wallet }) {
  return {
    currencies: wallet.currencies,
  };
}

export default connect(mapStateToProps)(FormExpenses);

FormExpenses.propTypes = {
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
};
