import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Creators as WalletActions } from '../actions/wallet';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.payment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    this.expenseTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleAddExpense() {
    const { addExpenseWithCurrencies } = this.props;
    addExpenseWithCurrencies(this.state);
    this.setState({ value: '' });
  }

  renderValueInput(value) {
    return (
      <input
        type="text"
        value={ value }
        name="value"
        data-testid="value-input"
        placeholder="Valor"
        onChange={ this.handleChange }
      />
    );
  }

  renderDescriptionInput(description) {
    return (
      <input
        type="text"
        value={ description }
        name="description"
        data-testid="description-input"
        placeholder="Descrição"
        onChange={ this.handleChange }
      />
    );
  }

  renderMethodSelect(method) {
    return (
      <select
        name="method"
        value={ method }
        data-testid="method-input"
        onChange={ this.handleChange }
      >
        { this.payment.map((currencymethod) => (
          <option key={ currencymethod }>
            { currencymethod }
          </option>
        ))}
      </select>
    );
  }

  renderCurrencySelect(currency) {
    const { currencies } = this.props;
    return (
      <select
        name="currency"
        value={ currency }
        data-testid="currency-input"
        onChange={ this.handleChange }
      >
        { currencies.map((currencycode) => (
          <option
            key={ currencycode }
            data-testid={ currencycode }
          >
            { currencycode }
          </option>
        ))}
      </select>
    );
  }

  renderTagSelect(tag) {
    return (
      <select
        name="tag"
        value={ tag }
        data-testid="tag-input"
        onChange={ this.handleChange }
      >
        { this.expenseTags.map((currencytags) => (
          <option key={ currencytags }>
            { currencytags }
          </option>
        ))}
      </select>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          { this.renderValueInput(value) }
          { this.renderDescriptionInput(description) }
          { this.renderCurrencySelect(currency) }
          { this.renderMethodSelect(method) }
          { this.renderTagSelect(tag) }
          <button
            type="button"
            onClick={ this.handleAddExpense }
          >
            Adicionar Despesa
          </button>
        </form>
      </div>
    );
  }
}
Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpenseWithCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToPros = (dispatch) => bindActionCreators(WalletActions, dispatch);

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});
export default connect(mapStateToProps, mapDispatchToPros)(Form);
