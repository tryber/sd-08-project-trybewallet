import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmEditing as endEditAction,
  fetchCurrencies as actualCurrencies,
} from '../actions';

class EditExpsesForm extends React.Component {
  constructor(props) {
    super(props);
    const { expenses, expenseId } = this.props;
    const expense = expenses.find((item) => item.id === expenseId);
    const { description, currency, method, tag, id, value, exchangeRates } = expense;
    this.state = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    };
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderSelectCurrencies = this.renderSelectCurrencies.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { value, description, currency, method, tag, id, exchangeRates } = this.state;
    const { confirmEditing } = this.props;
    const expenses = {
      value,
      method,
      tag,
      description,
      currency,
      id,
      exchangeRates,
    };
    confirmEditing(expenses);
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
        type="submit"
        onClick={ this.handleClick }
      >
        Editar despesa
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

EditExpsesForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  expenseId: PropTypes.number.isRequired,
  confirmEditing: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(actualCurrencies()),
  confirmEditing: (payload) => dispatch(endEditAction(payload)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  expenseId: state.wallet.expenseId,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpsesForm);

EditExpsesForm.defaultProps = {
  currencies: [],
  expenses: [],
};
