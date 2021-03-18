import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
      currency: 'USD',
      description: '',
      method: '',
      tag: '',
      value: '',
      id: 0,
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inputValue = this.inputValue.bind(this);
    this.getApi = this.getApi.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.inputMethod = this.inputMethod.bind(this);
    this.inputCategory = this.inputCategory.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const data = await this.getApi();
    const objectKeys = Object.keys(data);
    const currencies = objectKeys.filter((item) => item !== 'USDT');
    const objectValues = Object.values(data);
    const currencyValue = [];
    for (let i = 0; i < objectValues.length; i += 1) {
      if (i !== 1) {
        currencyValue.push(objectValues[i].ask);
      }
    }

    this.setState({
      currencies,
      exchangeRates: data,
    });
  }

  async getApi() {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const fetchApi = await fetch(endpoint);
    const data = await fetchApi.json();
    return data;
  }

  inputCurrency() {
    const { currencies } = this.state;
    return (
      <div>
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ (event) => this.handleChange(event) }
        >
          {currencies.map((data) => (
            <option key={ data } value={ data } data-testid={ data }>
              {data}
            </option>
          ))}
        </select>
      </div>
    );
  }

  inputValue() {
    const { value } = this.state;
    return (
      <div>
        <input
          type="text"
          name="value"
          value={ value }
          data-testid="value-input"
          placeholder="Insira o valor"
          onChange={ (event) => this.handleChange(event) }
        />
        <textarea
          type="text"
          name="description"
          data-testid="description-input"
          placeholder="Insira a descrição"
          onChange={ (event) => this.handleChange(event) }
        />
      </div>
    );
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  inputMethod() {
    const methodArray = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <div>
        <select
          data-testid="method-input"
          name="method"
          onChange={ (event) => this.handleChange(event) }
        >
          {methodArray.map((method) => (
            <option key={ method } value={ method } data-testid={ method }>
              {method}
            </option>
          ))}
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
          {categoryArray.map((category) => (
            <option key={ category } value={ category } data-testid={ category }>
              {category}
            </option>
          ))}
        </select>
      </div>
    );
  }

  handleClick() {
    const {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;
    let { id } = this.state;
    const { expensesCreator } = this.props;
    this.getCurrencies();
    expensesCreator({ value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates });
    id += 1;
    this.setState({ id, value: '' }, () => this.totalValue());
  }

  totalValue() {
    const { expenses, totalAmount } = this.props;

    let total = 0;
    const arr = expenses.map((objs) => (objs.value
    * (objs.exchangeRates[objs.currency].ask)));
    for (let i = 0; i < arr.length; i += 1) {
      total += arr[i];
    }
    totalAmount(total);
  }

  render() {
    return (
      <div>
        {this.inputValue()}
        {this.inputCurrency()}
        {this.inputMethod()}
        {this.inputCategory()}
        <button type="button" onClick={ this.handleClick }>
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  expensesCreator: (expenses) => dispatch({ type: 'ADD_DESPESAS', expenses }),
  totalAmount: (amount) => dispatch({ type: 'TOTAL_AMOUNT', amount }),
});

Form.propTypes = {
  expensesCreator: PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    exchangeRates: PropTypes.number.isRequired,
  }).isRequired,
  expenses: PropTypes.shape.isRequired,
  totalAmount: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
