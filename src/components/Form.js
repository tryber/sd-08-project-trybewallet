import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenseExchangeRates } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.payments = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    this.tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    this.currencies = [
      'USD', 'CAD', 'EUR',
      'GBP', 'ARS', 'BTC',
      'LTC', 'JPY', 'CHF',
      'AUD', 'CNY', 'ILS',
      'ETH', 'XRP',
    ];

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleExpense = this.handleExpense.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleExpense() {
    const { expenses } = this.props;
    expenses(this.state);
    this.setState({ value: '' });
  }

  renderExpenseInput(value) {
    return (
      <label htmlFor="input-despesa">
        Adicione sua despesa:
        <input
          type="number"
          name="value"
          placeholder="Quanto você gastou?"
          data-testid="value-input"
          id="input-despesa"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescriptionInput(description) {
    return (
      <label htmlFor="descricao-despesa">
        Descreva sua despesa:
        <textarea
          placeholder="Você gastou com o quê?"
          name="description"
          data-testid="description-input"
          id="descricao-despesa"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrencyInput(currency) {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <label htmlFor="select-label">
        Escolha a moeda de sua despesa:
        <select
          id="select-label"
          value={ currency }
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          {this.currencies.map((curr) => (
            <option
              data-testid={ curr }
              key={ curr }
              value={ curr }
            >
              { curr }
            </option>))}
        </select>
      </label>
    );
  }

  renderMethodInput(method) {
    return (
      <label htmlFor="method-payment">
        Forma de Pagamento:
        <select
          value={ method }
          onChange={ this.handleChange }
          name="method"
          data-testid="method-input"
          id="method-payment"
        >
          {this.payments.map((methodPay) => (
            <option key={ methodPay } value={ methodPay }>{ methodPay }</option>
          ))}
        </select>
      </label>
    );
  }

  renderTagInput(tag) {
    return (
      <label htmlFor="kindOfExpense">
        Tipo de despesa:
        <select
          value={ tag }
          onChange={ this.handleChange }
          name="tag"
          data-testid="tag-input"
          id="kindOfExpense"
        >
          {this.tags.map((kind) => (
            <option key={ kind } value={ kind }>{ kind }</option>
          ))}
        </select>
      </label>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        {this.renderExpenseInput(value)}
        {this.renderDescriptionInput(description)}
        {this.renderCurrencyInput(currency)}
        {this.renderMethodInput(method)}
        {this.renderTagInput(tag)}
        <button type="button" onClick={ this.handleExpense }>Adicionar despesa</button>
      </form>
    );
  }
}

Form.propTypes = {
  expenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  expenses: (value) => dispatch(expenseExchangeRates(value)),
});

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
