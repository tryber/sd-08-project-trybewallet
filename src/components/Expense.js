import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import coinApi from '../services/coinApi';
import { addExpense as addExpenseAction } from '../actions';
import MethodAndTag from './MethodAndTag';

class Expense extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currencies: [],
    };

    this.handleChage = this.handleChage.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    coinApi().then((data) => {
      this.setState({
        currencies: Object.values(data),
      });
    });
  }

  handleChage(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  reset() {
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  submitAll(action) {
    const { value, description, currency, method, tag } = this.state;
    const newExpense = {
      value,
      description,
      currency,
      method,
      tag,
    };
    action(newExpense);
    this.reset();
  }

  render() {
    const { addExpense } = this.props;
    const { currencies, value, description, currency, method, tag } = this.state;
    const currencyWithouUSDT = currencies.filter((seila) => seila.codein !== 'BRLT');

    return (
      <div>
        <input
          type="number"
          name="value"
          data-testid="value-input"
          value={ value }
          onChange={ this.handleChage }
        />
        <input
          type="text"
          name="description"
          data-testid="description-input"
          value={ description }
          onChange={ this.handleChage }
        />
        <select
          name="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChage }
        >
          {
            currencyWithouUSDT.map(({ code }) => (
              <option
                key={ code }
                data-testid={ code }
              >
                {code}
              </option>))
          }
        </select>
        <MethodAndTag method={ method } tag={ tag } handleChage={ this.handleChage } />
        <button
          type="button"
          onClick={ () => this.submitAll(addExpense) }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
});

Expense.propTypes = {
  addExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Expense);
