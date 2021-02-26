import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencys } from '../actions';
import TextInputLabel from './TextInputLabel';

class ExpenseForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      codes: [],
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: props.idStore,
    };

    this.onChange = this.onChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.updateID = this.updateID.bind(this);
  }

  componentDidMount() {
    this.loadCurrencys();
  }

  componentDidUpdate() {
    this.updateID();
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  getCurrencysOptions() {
    const { codes } = this.state;
    return codes.map((currencyCode) => (
      <option
        value={ currencyCode }
        key={ currencyCode }
        data-testid={ currencyCode }
      >
        { currencyCode }
      </option>
    ));
  }

  updateID() {
    const { id } = this.state;
    const { idStore } = this.props;
    if (id !== idStore) {
      this.setState({
        id: idStore,
      });
    }
  }

  async loadCurrencys() {
    const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());
    delete exchangeRates.USDT; // https://stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object
    const codes = Object.keys(exchangeRates);
    this.setState({ codes });
  }

  addExpense(event) {
    event.preventDefault();

    const expense = { ...this.state };
    const { addExpenseProp } = this.props;
    delete expense.codes;
    addExpenseProp(expense);

    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  }

  renderValueInput(value) {
    return (
      <TextInputLabel
        htmlFor="value-input"
        labelText="Despesa"
        id="value-input"
        name="value"
        type="text"
        value={ value.toString() }
        onChange={ this.onChange }
        dataTestId="value-input"
      />
    );
  }

  renderDescriptionInput(description) {
    return (
      <TextInputLabel
        htmlFor="description-input"
        labelText="Descrição da despesa"
        id="description-input"
        name="description"
        type="text"
        value={ description }
        onChange={ this.onChange }
        dataTestId="description-input"
      />
    );
  }

  renderCurrencySelect(currency) {
    return (
      <div>
        <label htmlFor="currency-input">
          Moeda:
          <select
            type="text"
            id="currency-input"
            data-testid="currency-input"
            value={ currency }
            name="currency"
            onChange={ this.onChange }
          >
            { this.getCurrencysOptions() }
          </select>
        </label>
      </div>
    );
  }

  renderMethodSelect(method) {
    return (
      <div>
        <label htmlFor="method-input">
          Método:
          <select
            type="text"
            id="method-input"
            data-testid="method-input"
            value={ method }
            name="method"
            onChange={ this.onChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }

  renderTagSelect(tag) {
    return (
      <div>
        <label htmlFor="tag-input">
          Categoria:
          <select
            type="text"
            id="tag-input"
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.onChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }

  render() {
    const { value, description, currency,
      method, tag } = this.state;
    return (
      <form className="expense-form" onSubmit={ this.addExpense }>
        { this.renderValueInput(value) }
        { this.renderDescriptionInput(description) }
        { this.renderCurrencySelect(currency) }
        { this.renderMethodSelect(method) }
        { this.renderTagSelect(tag) }

        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpenseProp: (expense) => dispatch(fetchCurrencys(expense)),
});

const mapStateToProps = (state) => ({
  idStore: state.wallet.expenses.length,
});

ExpenseForm.propTypes = {
  idStore: PropTypes.number.isRequired,
  addExpenseProp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
