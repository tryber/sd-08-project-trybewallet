import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencies as fetchCurrenciesAction,
  addExpense as addExpenseAction,
} from '../actions/index';

class AddExpensesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.renderValueInput = this.renderValueInput.bind(this);
    this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
    this.renderCurrencyInput = this.renderCurrencyInput.bind(this);
    this.renderMethodInput = this.renderMethodInput.bind(this);
    this.renderTagInput = this.renderTagInput.bind(this);
    this.renderAddExpensesButton = this.renderAddExpensesButton.bind(this);
    this.renderFormularioDespesas = this.renderFormularioDespesas.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }));
  }

  async handleAddExpense() {
    const { expenses, addExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    let id = 0;
    if (expenses !== undefined) { id = expenses.length; }
    const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());
    const newExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    addExpense(newExpense);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  renderCurrencies() {
    const { currencies } = this.props;
    return currencies.map((curr) => (
      <option key={ curr } data-testid={ curr }>{ curr }</option>
    ));
  }

  renderValueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrencyInput() {
    const { currency } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {this.renderCurrencies()}
        </select>
      </label>
    );
  }

  renderMethodInput() {
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Metodo de Pagamento:
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTagInput() {
    const { tag } = this.state;
    return (
      <>
        <label htmlFor="tag-input">
          Categoria:
          {' '}
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        {' '}
      </>
    );
  }

  renderAddExpensesButton() {
    return (
      <button
        type="button"
        onClick={ this.handleAddExpense }
      >
        Adicionar despesa
      </button>
    );
  }

  renderFormularioDespesas() {
    return (
      <>
        { this.renderValueInput() }
        { this.renderDescriptionInput() }
        { this.renderCurrencyInput() }
        { this.renderMethodInput() }
        { this.renderTagInput() }
        { this.renderAddExpensesButton() }
      </>
    );
  }

  render() {
    return (
      <>
        { this.renderFormularioDespesas() }
      </>
    );
  }
}

AddExpensesComponent.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
};

AddExpensesComponent.defaultProps = {
  expenses: [],
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
  addExpense: (e) => dispatch(addExpenseAction(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensesComponent);
