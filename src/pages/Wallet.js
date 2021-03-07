import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header, ExpensesTable } from '../components';

import {
  fetchCurrencyType as fetchCurrencyTypeThunk,
  handleAddExpense as handleAddExpenseAction,
  handleSubmitExpense as handleSubmitExpenseAction,
} from '../actions';

const INITIAL_STATE = {
  id: 0,
  value: '0',
  description: '',
  currency: 'USD',
  payment: 'Dinheiro',
  tag: 'Alimentação',
};

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      ...INITIAL_STATE,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleAddNewExpense = this.handleAddNewExpense.bind(this);
    this.handleEditSpecificExpense = this.handleEditSpecificExpense.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencyType } = this.props;

    fetchCurrencyType();
  }

  handleFieldChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleAddNewExpense() {
    const { id, value, description, currency, payment, tag } = this.state;
    const { handleAddExpense } = this.props;

    const expense = {
      id,
      value,
      description,
      currency,
      method: payment,
      tag,
      exchangeRates: await fetch('https://economia.awesomeapi.com.br/json/all').then((response) => response.json()),
    };

    handleAddExpense(expense);

    this.setState({ ...INITIAL_STATE, id: id + 1 });
  }

  handleEditSpecificExpense() {
    const { id, value, description, currency, payment, tag } = this.state;
    const { handleSubmitExpense } = this.props;

    const expense = {
      value,
      description,
      currency,
      method: payment,
      tag,
    };

    handleSubmitExpense(expense);

    this.setState({ ...INITIAL_STATE, id: id + 1 });
  }

  renderInputs() {
    const { value, description } = this.state;

    return (
      <>
        <input
          type="number"
          name="value"
          placeholder="Valor"
          value={ value }
          onChange={ this.handleFieldChange }
          data-testid="value-input"
        />

        <input
          type="text"
          name="description"
          placeholder="Descrição"
          value={ description }
          onChange={ this.handleFieldChange }
          data-testid="description-input"
        />
      </>
    );
  }

  renderSelects() {
    const { payment, tag, currency: currencies } = this.state;
    const { currency } = this.props;

    return (
      <>
        <select
          name="currency"
          value={ currencies }
          onChange={ this.handleFieldChange }
          data-testid="currency-input"
        >
          {currency
            ? delete currency.USDT && Object.keys(currency).map((type, index) => (
              <option key={ index } data-testid={ type }>{type}</option>
            ))
            : []}
        </select>

        <select
          name="payment"
          value={ payment }
          onChange={ this.handleFieldChange }
          data-testid="method-input"
        >
          Forma de pagamento

          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de débito">Cartão de débito</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
        </select>

        <select
          name="tag"
          value={ tag }
          onChange={ this.handleFieldChange }
          data-testid="tag-input"
        >
          Categoria

          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </>
    );
  }

  render() {
    const { isEditing } = this.props;

    return (
      <>
        <Header />

        <main>
          {this.renderInputs()}

          {this.renderSelects()}

          <button
            type="button"
            onClick={ isEditing
              ? this.handleEditSpecificExpense
              : this.handleAddNewExpense }
          >
            {isEditing ? 'Editar despesa' : 'Adicionar despesa'}
          </button>

          <ExpensesTable />
        </main>
      </>
    );
  }
}

const mapStateToProps = ({ wallet: { currency, expenses, id, isEditing } }) => ({
  currency,
  expenses,
  id,
  isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencyType: () => dispatch(
    fetchCurrencyTypeThunk(),
  ),
  handleAddExpense: (expense) => dispatch(
    handleAddExpenseAction(expense),
  ),
  handleSubmitExpense: (expense) => dispatch(
    handleSubmitExpenseAction(expense),
  ),
});

Wallet.propTypes = {
  currency: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  fetchCurrencyType: PropTypes.func.isRequired,
  handleAddExpense: PropTypes.func.isRequired,
  handleSubmitExpense: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
