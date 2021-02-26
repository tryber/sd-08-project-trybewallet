import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, saveExpense as addExpense } from '../actions';
import currenciesAPI from '../services';
import {
  renderInput,
  renderSelect,
  renderSelectCurrencies,
  renderExpensesTable,
} from '../services/renders';

const INITIAL_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
  total: '0.00  ',
};
class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getTotalExpenses = this.getTotalExpenses.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  getTotalExpenses() {
    const { expenses } = this.props;
    const totalExpenses = expenses.reduce((total, each) => {
      const { value, currency, exchangeRates } = each;
      const rate = parseFloat(exchangeRates[currency].ask);
      return total + parseFloat(value) * rate;
    }, 0);
    return totalExpenses.toFixed(2);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleClick(e) {
    e.preventDefault();
    const { value, description, currency, method, tag, id } = this.state;
    const { saveExpense } = this.props;
    const exchangeRates = await currenciesAPI();
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    saveExpense(expense);
    this.setState({
      ...INITIAL_STATE,
      id: id + 1,
      total: this.getTotalExpenses(),
    });
  }

  render() {
    const { value, description, currency, method, tag, total } = this.state;
    const { currencies, expenses, email } = this.props;
    const currenciesName = Object.keys(currencies || {});
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <div>
        <header>
          TrybeWallet
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{`R$ ${total}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          {renderInput('Valor', 'number', 'value', value, this.handleChange)}
          {renderInput(
            'Descrição',
            'text',
            'description',
            description,
            this.handleChange,
          )}
          <label htmlFor="currency-input">
            {'Moeda: '}
            {renderSelectCurrencies(currenciesName, currency, this.handleChange)}
          </label>
          {renderSelect(
            'Método de pagamento',
            'method',
            method,
            this.handleChange,
            methods,
          )}
          {renderSelect('Tag', 'tag', tag, this.handleChange, tags)}
          <button type="submit" onClick={ this.handleClick }>
            Adicionar despesa
          </button>
        </form>
        {renderExpensesTable(expenses)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies[0],
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  saveExpense: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
  currencies: PropTypes.objectOf(PropTypes.object),
  getCurrencies: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  expenses: [],
  currencies: {},
};
