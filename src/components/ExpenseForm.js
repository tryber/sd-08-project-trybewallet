import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import expenseType from '../types';

import styles from '../styles/components/ExpenseForm.module.css';

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
    this.setState(({ fields }) => ({
      fields: {
        ...fields,
        [name]: value,
      },
    }));
  }

  handleButtonAction() {
    const { fields } = this.state;
    const { initialState, buttonAction } = this.props;
    buttonAction(fields);
    this.setState({ ...initialState });
  }

  renderValueInput() {
    const { fields: { value } } = this.state;
    return (
      <input
        type="number"
        name="value"
        value={ value }
        data-testid="value-input"
        placeholder="Valor da despesa"
        onChange={ this.handleChange }
      />
    );
  }

  renderDescriptionInput() {
    const { fields: { description } } = this.state;
    return (
      <input
        className={ styles.flexGrow }
        type="text"
        name="description"
        value={ description }
        data-testid="description-input"
        placeholder="Descrição da despesa"
        onChange={ this.handleChange }
      />
    );
  }

  renderCurrencySelect() {
    const { fields: { currency } } = this.state;
    const { currencies } = this.props;
    return (
      <select
        type="text"
        name="currency"
        value={ currency }
        data-testid="currency-input"
        placeholder="Tipo de moeda"
        onChange={ this.handleChange }
      >
        { currencies.map((code) => (
          <option value={ code } data-testid={ code } key={ code }>{ code }</option>)) }
      </select>
    );
  }

  renderPaymentMethodsSelect() {
    const { fields: { method } } = this.state;
    return (
      <select
        type="text"
        name="method"
        value={ method }
        data-testid="method-input"
        placeholder="Método de pagamento"
        onChange={ this.handleChange }
      >
        { this.paymentMethods.map((paymentMethod, index) => (
          <option key={ index }>{ paymentMethod }</option>)) }
      </select>
    );
  }

  renderExpenseTagsSelect() {
    const { fields: { tag } } = this.state;
    return (
      <select
        type="text"
        name="tag"
        value={ tag }
        data-testid="tag-input"
        placeholder="Categoria do gasto"
        onChange={ this.handleChange }
      >
        { this.expenseTags.map((currentTag, index) => (
          <option key={ index }>{ currentTag }</option>)) }
      </select>
    );
  }

  render() {
    const { buttonText } = this.props;
    return (
      <div className={ styles.expenseFormContainer }>
        <form
          className={ styles.expenseForm }
          onSubmit={ (event) => event.preventDefault() }
        >
          { this.renderValueInput() }
          { this.renderCurrencySelect() }
          { this.renderPaymentMethodsSelect() }
          { this.renderExpenseTagsSelect() }
          { this.renderDescriptionInput() }

          <button
            type="button"
            onClick={ this.handleButtonAction }
          >
            { buttonText }
          </button>
        </form>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  buttonAction: PropTypes.func.isRequired,
  initialState: expenseType.isRequired,
  buttonText: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(ExpenseForm);
