import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, requestCurrency } from '../actions';
import getCurrencyList, { fetchCurrency } from '../store/service';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
};
const createId = (arr) => {
  if (arr.length === 0) {
    return 0;
  }
  return arr[arr.length - 1].id + 1;
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchCurrency();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { addEx, exp } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const exchangeRates = await fetchCurrency();
    const expenses = {
      value, description, currency, method, tag, exchangeRates,
    };

    expenses.id = createId(exp);
    addEx(expenses);
    this.setState({
      value: 0,
    });
  }

  async fetchCurrency() {
    const { setCurrencies } = this.props;
    const list = await getCurrencyList();
    setCurrencies(list);
  }

  renderValue() {
    const { value } = this.state;
    return (
      <label htmlFor="despesas">
        Despesas:
        <input
          type="text"
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescription() {
    const { descrição } = this.state;
    return (
      <label htmlFor="descrição">
        Despesas:
        <input
          type="text"
          name="description"
          value={ descrição }
          data-testid="description-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrency() {
    const { currencies } = this.props;
    return (
      <select data-testid="currency-input" name="currency" onChange={ this.handleChange }>
        {
          currencies.map((list, index) => (
            <option
              data-testid={ list }
              key={ index }
              value={ list }
            >
              { list }
            </option>))
        }
      </select>
    );
  }

  renderMethod() {
    return (
      <select data-testid="method-input" name="method" onChange={ this.handleChange }>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  renderDespesas() {
    return (
      <select data-testid="tag-input" name="tag" onChange={ this.handleChange }>
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  render() {
    return (
      <form>
        { this.renderValue() }
        { this.renderDescription() }
        { this.renderCurrency() }
        { this.renderMethod() }
        { this.renderDespesas() }
        <button
          type="button"
          onClick={ () => this.handleClick() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  exp: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addEx: (expenses) => dispatch(addExpenses(expenses)),
  setCurrencies: (list) => dispatch(requestCurrency(list)),
});

Form.propTypes = {
  setCurrencies: PropTypes.func.isRequired,
  addEx: PropTypes.arrayOf(PropTypes.array).isRequired,
  exp: PropTypes.arrayOf(PropTypes.array).isRequired,
  currencies: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
