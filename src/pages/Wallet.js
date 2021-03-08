import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pegar, salvar } from '../actions';
import currenciesAPI from '../services';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
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

    const totalExpenses = expenses.reduce(
      (total, each) => {
        const { value, currency, exchangeRates } = each;
        const rate = parseFloat(exchangeRates[currency].ask);
        return total + (parseFloat(value) * rate);
      },
      0,
    );

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

  renderInput(type, name, value, handleChange) {
    return (
      <input
        type={ type }
        id={ `${name}-input` }
        name={ name }
        data-testid={ `${name}-input` }
        onChange={ handleChange }
        value={ value }
      />
    );
  }

  renderSelectCurrencies(currenciesName, value, handleChange) {
    return (
      <select
        id="currency-input"
        name="currency"
        data-testid="currency-input"
        onChange={ handleChange }
        value={ value }
      >
        {currenciesName.map((currency) => {
          if (currency === 'USDT') return;
          return (
            <option key={ currency } data-testid={ currency }>{currency}</option>
          );
        })}
      </select>
    );
  }

  renderSelectPaymentMethod(value, handleChange) {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <select
        id="method-input"
        name="method"
        data-testid="method-input"
        onChange={ handleChange }
        value={ value }
      >
        {methods.map((method) => (
          <option key={ method }>{method}</option>
        ))}
      </select>
    );
  }

  renderSelectTag(value, handleChange) {
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <select
        id="tag-input"
        name="tag"
        data-testid="tag-input"
        onChange={ handleChange }
        value={ value }
      >
        {tags.map((tag) => (
          <option key={ tag }>{tag}</option>
        ))}
      </select>
    );
  }

  render() {
    const { value, description, currency, method, tag, total } = this.state;
    const { email, currencies } = this.props;
    const currenciesName = Object.keys(currencies || {});
    return (
      <div>
        <header>
          TrybeWallet
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{`R$ ${total}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="value-input">
            {'Valor: '}
            {this.renderInput('number', 'value', value, this.handleChange)}
          </label>
          <label htmlFor="description-input">
            {'Descrição: '}
            {this.renderInput('text', 'description', description, this.handleChange)}
          </label>
          <label htmlFor="currency-input">
            {'Moeda: '}
            {this.renderSelectCurrencies(currenciesName, currency, this.handleChange)}
          </label>
          <label htmlFor="method-input">
            {'Método de Pagamento: '}
            {this.renderSelectPaymentMethod(method, this.handleChange)}
          </label>
          <label htmlFor="tag-input">
            {'Tag: '}
            {this.renderSelectTag(tag, this.handleChange)}
          </label>
          <button type="submit" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
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
  getCurrencies: () => dispatch(pegar()),
  saveExpense: (expense) => dispatch(salvar(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object),
  saveExpense: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  expenses: [],
  currencies: {},
};
