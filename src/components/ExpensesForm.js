import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/expensesForm.css';
import { addExpense } from '../actions';
import Payment from './Payment';
import Tag from './Tag';
import Currency from './Currency';

class ExpensesForm extends Component {
  constructor() {
    super();
    this.getCurrencys = this.getCurrencys.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.getFields = this.getFields.bind(this);
    this.clearState = this.clearState.bind(this);
    this.state = {
      currencys: [],
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    this.getCurrencys();
  }

  getFields({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async getCurrencys() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const availableCurrencys = await response.json();
    const filterCurrencys = Object.keys(availableCurrencys).filter(
      (currency) => currency !== 'USDT',
    );

    this.setState({ currencys: filterCurrencys });
  }

  clearState() {
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  async addExpense() {
    const { value, description, currency, method, tag } = this.state;
    const { regExpense } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await response.json();
    const expenseObject = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    regExpense(expenseObject);
    this.clearState();
  }

  render() {
    const { currencys, value, currency, method, tag, description } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            onChange={ this.getFields }
            type="number"
            id="value"
            name="value"
            value={ value }
          />
          <Currency
            getFields={ this.getFields }
            currency={ currency }
            currencys={ currencys }
          />
          <Payment getFields={ this.getFields } method={ method } />
          <Tag getFields={ this.getFields } tag={ tag } />
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="description"
              name="description"
              value={ description }
              onChange={ this.getFields }
            />
          </label>
          <button onClick={ this.addExpense } type="button">
            Adicionar despesa
          </button>
        </label>
      </form>
    );
  }
}
ExpensesForm.propTypes = {
  regExpense: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  regExpense: (objectExpense) => dispatch(addExpense(objectExpense)),
});

export default connect(null, mapDispatchToProps)(ExpensesForm);
