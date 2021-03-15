import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies as actualCurrencies,
  addExpense as saveAction } from '../actions';
import getCurrencies from '../services';

const INITAL_STATE_FORM = {
  value: '0',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
  currency: 'USD',
  id: 0,

};
class ExpensesForm extends React.Component {
  constructor() {
    super();
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderSelectCurrencies = this.renderSelectCurrencies.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      ...INITAL_STATE_FORM,
    };
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { value, description, currency, method, tag, id } = this.state;
    const { addExpense } = this.props;
    const exchangeRates = await getCurrencies();
    const expenses = {
      value,
      method,
      tag,
      description,
      currency,
      id,
      exchangeRates,
    };
    addExpense(expenses);
    this.setState({
      ...INITAL_STATE_FORM,
      id: id + 1,
    });
  }

  renderSelectCurrencies(label, name, value) {
    const { currencies } = this.props;
    return (
      <label htmlFor={ `${name}-input` }>
        {`${label}: `}
        <select
          id="currency-input"
          name={ name }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
          value={ value }
        >
          {currencies.map((currency) => {
            if (currency === 'USDT') return '';
            return (
              <option key={ currency } data-testid={ currency }>
                {currency}
              </option>
            );
          })}
        </select>
      </label>
    );
  }

  renderInput(label, type, name, value) {
    return (
      <label htmlFor={ `${name}-input` }>
        {`${label}: `}
        <input
          type={ type }
          id={ `${name}-input` }
          name={ name }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
          value={ value }
        />
      </label>
    );
  }

  renderSelect(label, name, value, method) {
    return (
      <label htmlFor={ `${name}` }>
        { `${label}: `}
        <select
          id={ `${name}` }
          name={ name }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
          value={ value }
        >
          {method.map((option) => (
            <option key={ option }>{option}</option>
          ))}
        </select>
      </label>
    );
  }

  renderButton() {
    return (
      <button
        type="button"
        onClick={ this.handleClick }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { value, method, tag, description, currency } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        { this.renderSelectCurrencies('Moeda', 'currency', currency)}
        { this.renderInput('Valor ', 'number', 'value', value) }
        { this.renderInput('Descrição ', 'text', 'description', description) }
        { this.renderSelect('Método de pagamento ', 'method', method, methods) }
        { this.renderSelect('Categoria ', 'tag', tag, tags) }
        { this.renderButton() }
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  addExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(actualCurrencies()),
  addExpense: (expenses) => dispatch(saveAction(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);

ExpensesForm.defaultProps = {
  currencies: [],
};
