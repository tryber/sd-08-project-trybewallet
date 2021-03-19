import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Gastos extends Component {
  constructor() {
    super();
    this.state = {
      Currencys: [],
      currency: 'USD',
      description: '',
      method: '',
      tag: '',
      value: '',
      id: 0,
    };
    this.getAPI = this.getAPI.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    this.inputCurrency = this.inputCurrency.bind(this);
    this.inputMethod = this.inputMethod.bind(this);
    this.inputCategory = this.inputCategory.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.totalValue = this.totalValue.bind(this);
  }

  componentDidMount() {
    this.getCurrency();
  }

  async getCurrency() {
    const Data = await this.getAPI();
    const dataKeys = Object.keys(Data);
    const Currencys = dataKeys.filter((item) => item !== 'USDT');
    this.setState({
      Currencys,
      exchangeRates: Data,
    });
  }

  async getAPI() {
    const endPoint = 'https://economia.awesomeapi.com.br/json/all';
    const fetchAPI = await fetch(endPoint);
    const Data = await fetchAPI.json();
    return Data;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  inputValues() {
    const { value } = this.state;
    return (
      <div>
        <input
          type="text"
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ (event) => this.handleChange(event) }
        />
        <textarea
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ (event) => this.handleChange(event) }
        />
      </div>
    );
  }

  inputCurrency() {
    const { Currencys } = this.state;
    return (
      <div>
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ (event) => this.handleChange(event) }
        >
          {Currencys.map((item) => (
            <option
              value={ item }
              key={ item }
              data-testid={ item }
            >
              {item}
            </option>))}
        </select>

      </div>
    );
  }

  inputMethod() {
    const methodArray = [
      'Dinheiro', 'Cartão de crédito', 'Cartão de débito',
    ];
    return (
      <div>
        <select
          data-testid="method-input"
          name="method"
          onChange={ (event) => this.handleChange(event) }
        >
          {methodArray.map((method) => (
            <option
              value={ method }
              key={ method }
              data-test-id={ method }
            >
              {method}
            </option>))}
        </select>
      </div>
    );
  }

  inputCategory() {
    const categoryArray = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];
    return (
      <div>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ (event) => this.handleChange(event) }
        >
          {categoryArray.map((tag) => (
            <option
              value={ tag }
              key={ tag }
              data-test-id={ tag }
            >
              {tag}
            </option>))}
        </select>
      </div>
    );
  }

  handleClick() {
    const { AddDespesa } = this.props;
    const {
      currency,
      description,
      method,
      tag,
      value,
      exchangeRates,
    } = this.state;
    let { id } = this.state;
    this.getCurrency();
    const object = {
      currency,
      description,
      method,
      tag,
      value,
      exchangeRates,
      id,
    };
    id += 1;
    AddDespesa(object);
    this.setState({
      id,
      value: '',
    }, this.totalValue());
  }

  totalValue() {
    const { expenses, AddDespesaTotal } = this.props;
    let count = 0;
    const arrayValues = expenses.map((item) => (
      item.value * (item.exchangeRates[item.currency].ask)
    ));
    for (let i = 0; i < arrayValues.length; i += 1) {
      count += arrayValues[i];
    }
    AddDespesaTotal(count);
  }

  render() {
    this.totalValue();
    return (
      <div>
        { this.inputValues() }
        { this.inputCurrency() }
        { this.inputMethod() }
        { this.inputCategory() }
        <button
          type="button"
          onClick={ () => this.handleClick() }
        >
          Adicionar despesa
        </button>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  AddDespesa: (despesa) => dispatch({ type: 'ADD_DESPESA', despesa }),
  AddDespesaTotal: (despesa) => dispatch({ type: 'ADD_DESPESATOTAL', despesa }),
});

Gastos.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  AddDespesaTotal: PropTypes.func.isRequired,
  AddDespesa: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gastos);
