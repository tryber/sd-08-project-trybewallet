import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import styles from '../styles/components/ExpenseForm.module.css';
import expenseType from '../types';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    const { initialState } = this.props;

    this.state = {
      ...initialState,
    };

    this.paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    this.expenseTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    this.handleChange = this.handleChange.bind(this);
    this.handleButtonAction = this.handleButtonAction.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleButtonAction() {
    const { buttonAction, initialState } = this.props;
    buttonAction(this.state);
    this.setState({ ...initialState });
  }

  firstInputForms(value) {
    return (
      <input
        type="number"
        value={ value }
        name="value"
        data-testid="value-input"
        placeholder="Valor"
        onChange={ this.handleChange }
      />
    );
  }

  inputForms(name, value, testid, placeholder) {
    return (
      <input
        type="text"
        value={ value }
        name={ name }
        data-testid={ testid }
        placeholder={ placeholder }
        onChange={ this.handleChange }
      />
    );
  }

  selectCurrencyInput(currency) {
    const { currencies } = this.props;
    return (
      <select
        name="currency"
        value={ currency }
        data-testid="currency-input"
        onChange={ this.handleChange }
      >
        { currencies.map((currencyCode) => (
          <option
            key={ currencyCode }
            value={ currencyCode }
            data-testid={ currencyCode }
          >
            {currencyCode}
          </option>
        ))}
      </select>
    );
  }

  selectMethodInput(method) {
    return (
      <select
        name="method"
        value={ method }
        data-testid="method-input"
        onChange={ this.handleChange }
      >
        { this.paymentMethods.map((methods) => (
          <option key={ methods } value={ methods }>{methods}</option>
        ))}
      </select>
    );
  }

  selectTagInput(tag) {
    return (
      <select
        name="tag"
        value={ tag }
        data-testid="tag-input"
        onChange={ this.handleChange }
      >
        { this.expenseTags.map((taggy) => (
          <option key={ taggy } value={ taggy }>{taggy}</option>
        ))}
      </select>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { buttonText } = this.props;
    return (
      <form>
        { this.firstInputForms(value) }
        { this.inputForms('description', description, 'description-input', 'Descrição') }
        { this.selectCurrencyInput(currency) }
        { this.selectMethodInput(method) }
        { this.selectTagInput(tag) }
        <button
          type="button"
          onClick={ this.handleButtonAction }
        >
          { buttonText }
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialState: expenseType.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(ExpenseForm);
