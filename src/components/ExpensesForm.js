import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  addExpense as addExpenseAction,
  deleteExpense as deleteExpenseAction,
  fetchCurrencies as fetchCurrenciesAction,
} from '../actions';

class ExpensesForm extends React.Component {
  constructor() {
    super();

    this.initialState = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      exchangeRates: {},
    };

    this.state = { id: 0, ...this.initialState };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value });
  }

  async handleAddClick(event) {
    event.preventDefault();
    const { addExpense } = this.props;
    const apiResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const apiJson = await apiResponse.json();
    this.setState({ exchangeRates: apiJson }, () => {
      addExpense(this.state);
      this.setState((previousState) => ({
        id: previousState.id + 1,
        ...this.initialState,
      }));
    });
  }

  handleEditClick(event) {
    event.preventDefault();
    const { addExpense, editTarget, deleteExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    deleteExpense(parseInt(editTarget.id, 10));
    addExpense({
      id: editTarget.id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: editTarget.exchangeRates,
    });
  }

  renderInput(name, attribute, state) {
    return (
      <label htmlFor={ attribute }>
        { name }
        <input
          data-testid={ `${attribute}-input` }
          id={ attribute }
          onChange={ this.handleChange }
          type="text"
          value={ state }
        />
      </label>
    );
  }

  renderSelect(name, attribute, state, options) {
    return (
      <label htmlFor={ attribute }>
        { name }
        <select
          data-testid={ `${attribute}-input` }
          id={ attribute }
          name={ attribute }
          onChange={ this.handleChange }
          value={ state }
        >
          { options.map((option) => (
            <option data-testid={ option } key={ option } value={ option }>
              { option }
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderButton() {
    const { editTarget } = this.props;
    return (
      <button
        onClick={ Object.keys(editTarget).length === 0
          ? this.handleAddClick : this.handleEditClick }
        type="submit"
      >
        { Object.keys(editTarget).length === 0
          ? 'Adicionar despesa' : 'Editar despesa' }
      </button>
    );
  }

  render() {
    const { loading, currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const expenseTags = ['Lazer', 'Alimentação', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        { this.renderInput('Valor:', 'value', value) }
        { this.renderInput('Descrição:', 'description', description) }
        { !loading && this.renderSelect('Moeda:', 'currency', currency, currencies) }
        { this.renderSelect('Método de pagamento:', 'method', method, paymentMethods) }
        { this.renderSelect('Categoria da Despesa:', 'tag', tag, expenseTags) }
        { this.renderButton() }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.wallet.isFetching,
  currencies: state.wallet.currencies,
  editTarget: state.wallet.editTarget,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (payload) => dispatch(addExpenseAction(payload)),
  deleteExpense: (payload) => dispatch(deleteExpenseAction(payload)),
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

ExpensesForm.propTypes = {
  loading: PropTypes.bool,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editTarget: PropTypes.objectOf(PropTypes.any),
  addExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
};

ExpensesForm.defaultProps = {
  loading: undefined,
  editTarget: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
