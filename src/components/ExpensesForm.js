import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as WalletActions } from '../actions/wallet';

import api from '../services';

import styles from '../styles/components/ExpensesForm.module.css';

const INITIAL_STATE = {
  fields: {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  },
};

class ExpensesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      coinTypes: [],
    };

    this.paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    this.expensesTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpenses = this.handleAddExpenses.bind(this);
  }

  componentDidMount() {
    api.getCoins().then((coins) => {
      delete coins.USDT;
      this.setState({ coinTypes: Object.values(coins) });
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState(({ fields }) => ({
      fields: {
        ...fields,
        [name]: value,
      },
    }));
  }

  handleAddExpenses() {
    const { fields } = this.state;
    const { addExpenseWithCoins } = this.props;
    addExpenseWithCoins(fields);
    this.setState({ ...INITIAL_STATE });
  }

  renderValueInput() {
    const { fields: { value } } = this.state;
    return (
      <input
        type="text"
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
    const { fields: { currency }, coinTypes } = this.state;
    return (
      <select
        type="text"
        name="currency"
        value={ currency }
        data-testid="currency-input"
        placeholder="Tipo de moeda"
        onChange={ this.handleChange }
      >
        { coinTypes.map(({ name, code }) => (
          <option value={ code } data-testid={ code } key={ code }>{ name }</option>)) }
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

  renderExpensesTagsSelect() {
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
        { this.expensesTags.map((currentTag, index) => (
          <option key={ index }>{ currentTag }</option>)) }
      </select>
    );
  }

  render() {
    return (
      <div className={ styles.expensesFormContainer }>
        <form
          className={ styles.expensesForm }
          onSubmit={ (event) => event.preventDefault() }
        >
          { this.renderValueInput() }
          { this.renderDescriptionInput() }
          { this.renderCurrencySelect() }
          { this.renderPaymentMethodsSelect() }
          { this.renderExpensesTagsSelect() }

          <button
            type="button"
            onClick={ this.handleAddExpenses }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

ExpensesForm.propTypes = {
  addExpenseWithCoins: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

export default connect(null, mapDispatchToProps)(ExpensesForm);
