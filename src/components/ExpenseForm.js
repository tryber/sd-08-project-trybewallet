import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../styles/components/ExpenseForm.css';
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

  renderValueInput(value) {
    return (
      <input
        type="number"
        value={ value }
        name="value"
        data-testid="value-input"
        onChange={ this.handleChange }
        placeholder="valor"
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
        onChange={ this.handleChange }
        placeholder="descrição da despesa"
      />
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

  renderMethodSelect(method) {
    return (
      <select
        name="method"
        value={ method }
        data-testid="method-input"
        onChange={ this.handleChange }
      >
        { this.paymentMethods.map((currentMethod) => (
          <option
            key={ currentMethod }
            value={ currentMethod }
          >
            { currentMethod}
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
        { this.expenseTags.map((currentTag) => (
          <option key={ currentTag } value={ currentTag }>{ currentTag }</option>
        ))}
      </select>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { buttonText } = this.props;
    return (
      <form className="expenseForm">
        { this.renderValueInput(value) }
        { this.renderDescriptionInput(description) }
        { this.renderCurrencySelect(currency) }
        { this.renderMethodSelect(method) }
        { this.renderTagSelect(tag) }
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
