import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAction, addExpenseAction } from '../actions/index';

import fetchCodeAPI from '../services/fetchCodeAPI';
import fetchEntriesAPI from '../services/fetchEntriesAPI';

class WalletExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueExpense: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.btnAddExpense = this.btnAddExpense.bind(this);
  }

  async componentDidMount() {
    // console.log('didmount');
    const { fetchCurrenciesSave } = this.props;
    const dataCurrencies = await fetchCodeAPI();
    // console.log(dataCurrencies);
    fetchCurrenciesSave(dataCurrencies);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  formInput(valueExpense) {
    return (
      <label htmlFor="valueExpense">
        Valor da despesa:
        <input
          type="number"
          value={ valueExpense }
          name="valueExpense"
          data-testid="value-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  formDescription(description) {
    return (
      <label htmlFor="description">
        Descrição da Despesa:
        <textarea
          type="text"
          value={ description }
          name="description"
          data-testid="description-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  formCurrency(currency, getCurrenciesStore) {
    return (
      <label htmlFor="currency-input">
        Selecione Moeda da Despesa:
        <select
          name="currency"
          id="currency-input"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.handleChange }

        >
          { getCurrenciesStore.map((el) => (
            <option
              data-testid={ el }
              key={ el }
              value={ el }
            >
              { el }
            </option>
          ))}
        </select>
      </label>
    );
  }

  formMethod(method, methodOptions) {
    return (
      <label htmlFor="method-input">
        Selecione Método de Pagamento:
        <select
          name="method"
          id="method-input"
          value={ method }
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          { methodOptions.map((el) => (
            <option key={ el } value={ el }>{ el }</option>
          ))}
        </select>
      </label>
    );
  }

  formTag(tag, tagOptions) {
    return (
      <label htmlFor="tag-input">
        Selecione a Categoria da Despesa:
        <select
          name="tag"
          id="tag-input"
          value={ tag }
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          { tagOptions.map((el) => (
            <option key={ el } value={ el }>{ el }</option>
          ))}
        </select>
      </label>
    );
  }

  async btnAddExpense(e) {
    // console.log('clicou');
    e.preventDefault();
    const { AddExpsenseSave } = this.props;
    const { valueExpense, description, currency, method, tag } = this.state;
    const exchangeRates = await fetchEntriesAPI();
    // console.log(exchangeRates);
    const objetctExpenses = {
      valueExpense, description, currency, method, tag, exchangeRates,
    };
    AddExpsenseSave(objetctExpenses);
  }

  render() {
    const { valueExpense, description, currency, method, tag } = this.state;
    const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { getCurrenciesStore } = this.props;

    return (
      <form>
        { this.formInput(valueExpense) }
        { this.formDescription(description) }
        { this.formCurrency(currency, getCurrenciesStore) }
        { this.formMethod(method, methodOptions) }
        {this.formTag(tag, tagOptions) }
        <button
          type="button"
          onClick={ this.btnAddExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesSave: (dataCurrencies) => (
    dispatch(fetchCurrenciesAction(dataCurrencies))),

  AddExpsenseSave: (objetctExpenses) => (
    dispatch(addExpenseAction(objetctExpenses))),
});

const mapStateToProps = (state) => ({
  getCurrenciesStore: state.walletReducer.currencies,
  expensesStore: state.walletReducer.expenses,
});

WalletExpenseForm.propTypes = {
  AddExpsenseSave: PropTypes.func.isRequired,
  fetchCurrenciesSave: PropTypes.func.isRequired,
  getCurrenciesStore: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpenseForm);
