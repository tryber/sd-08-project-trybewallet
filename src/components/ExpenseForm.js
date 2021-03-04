import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrenciesAction, addExpenseAction } from '../actions/index';

import fetchAPI from '../services/fetchAPI';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueExpense: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.btnAddExpense = this.btnAddExpense.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  async componentDidMount() {
    console.log('didmount');
    const dataCurrencies = await fetchAPI();
    console.log(dataCurrencies);
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

  formCurrency(currency, dataCurrencies) {
    return (
      <label htmFor="currency">
        Selecione Moeda da Despesa:
        <select
          name="currency"
          value={ currency }
          data-testid="USD"
          onChance={ this.handleChange }
        >
          {/* { dataCurrencies.map((el) => (
            <option key={ el } value={ el }>{ el }</option>
          ))} */}
        </select>
      </label>
    );
  }

  formMethod(method, methodOptions) {
    return (
      <label htmFor="method">
        Selecione Método de Pagamento:
        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChance={ this.handleChange }
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
      <label htmFor="tag">
        Selecione a Categoria da Despesa:
        <select
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChance={ this.handleChange }
        >
          { tagOptions.map((el) => (
            <option key={ el } value={ el }>{ el }</option>
          ))}
        </select>
      </label>
    );
  }

  formSubmit(event) {
    event.preventDefault();
    // const { AddExpsenseSubmmit } = this.props;
    // const { objetctExpenses } = this.state;
    // AddExpsenseSubmmit(objetctExpenses);
    // this.setState({ loginConfirm: true });
    console.log('teste submit');
  }

  btnAddExpense() {
    console.log('clicou');
  }

  render() {
    const { valueExpense, description, currency, method, tag } = this.state;
    const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form
        onSubmit={ this.formSubmit }
      >
        { this.formInput(valueExpense) }
        { this.formDescription(description) }
        { this.formCurrency(currency) }
        { this.formMethod(method, methodOptions) }
        {this.formTag(tag, tagOptions) }
        <button
          type="submit"
        >
          Entrar
        </button>
      </form>
    );
  }
}

// const mapStateToProps = (state) => ({
//   store: state.
// });

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesSave: (currencies) => dispatch(addExpenseAction(currencies)),

  AddExpsenseSubmmit: (objetctExpenses) => dispatch(addExpenseAction(objetctExpenses)),
});

export default connect(null, mapDispatchToProps)(ExpenseForm);
