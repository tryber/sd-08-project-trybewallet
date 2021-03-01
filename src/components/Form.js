import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency as fetchCurrencyAction,
  addExpense as addExpenseAction } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      expensesState: {
        id: null,
        value: '0',
        description: '',
        currency: 'USD',
        method: '',
        tag: '',
        exchangeRates: {},
      },
    };
  }

  // Primeira chamada a API para gerar o dropdown
  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  // Sugunda chamada a API para atualizar o exchangeRates para cada gasto adicionado
  fetchNewCurrency = async () => {
    const { fetchCurrency } = this.props;
    await fetchCurrency();
  }

  // Implementei esta função com a ajuda de https://learn.co/lessons/react-updating-state

  // A cada mudança nos inputs o state é atualizado
  handleChange = (event) => {
    const { expensesState } = this.state;
    const { expenses, currencyObject } = this.props;
    this.setState({
      expensesState: { ...expensesState,
        [event.target.name]: event.target.value,
        id: expenses.length,
        exchangeRates: currencyObject },
    });
  }

  // reseta o state para apagar os inputs
  resetState = () => {
    this.setState({
      expensesState: {
        id: null,
        value: '0',
        description: '',
        currency: 'EUR',
        method: '',
        tag: '',
        exchangeRates: {},
      },
    });
  }

  // Envio o state para o store
  saveExpenses = async (event) => {
    const { expensesState } = this.state;
    const { addExpense } = this.props;
    event.preventDefault();
    await this.fetchNewCurrency();
    addExpense(expensesState);
    this.resetState();
  }

  sumValue = () => {
    const { expenses } = this.props;
    const askAndValueList = expenses.map(
      (expense) => ({ ask: expense.exchangeRates[expense.currency].ask,
        value: expense.value }),
    );
    return askAndValueList.reduce(
      (sum, expense) => sum + parseFloat(expense.value) * parseFloat(expense.ask), 0,
    );
  }

  // Renderiza o dropdown com os dados da primeira chamada a API
  renderSelect = () => {
    const { isFetching, currencyObject } = this.props;
    const { expensesState } = this.state;
    if (isFetching === false) {
      const currencyList = Object.values(currencyObject);
      const currencyListFiltered = currencyList.filter(
        (object) => object.codein !== 'BRLT',
      );
      return (
        <select
          data-testid="currency-input"
          name="currency"
          id="currency"
          value={ expensesState.currency }
          onChange={ this.handleChange }
        >
          {currencyListFiltered.map(
            (currency) => (
              <option
                key={ currency.code }
                data-testid={ currency.code }
              >
                {currency.code}
              </option>),
          )}
        </select>);
    }
  }

  renderDescription = () => {
    const { expensesState } = this.state;
    return (
      <label htmlFor="description">
        descrição da despesa:
        <input
          data-testid="description-input"
          name="description"
          id="description"
          value={ expensesState.description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderTagInput = () => (
    <label htmlFor="tag">
      Tag:
      <select data-testid="tag-input" name="tag" id="tag" onChange={ this.handleChange }>
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>
    </label>
  )

  render() {
    const { expensesState } = this.state;
    return (
      <div>
        <p data-testid="total-field">
          Despesa Total:
          {this.sumValue()}
        </p>
        <form>
          <label htmlFor="value">
            Valor da despesa:
            <input
              data-testid="value-input"
              name="value"
              id="value"
              value={ expensesState.value }
              onChange={ this.handleChange }
            />
          </label>
          {this.renderDescription()}
          <label htmlFor="currency">
            moeda:
            {this.renderSelect()}
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              id="method"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          {this.renderTagInput()}
          <button type="submit" onClick={ this.saveExpenses }>Adicionar despesa</button>
        </form>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencyAction()),
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
});

const mapStateToProps = (state) => ({
  currencyObject: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  expenses: state.wallet.expenses,
});

Form.propTypes = {
  fetchCurrency: PropTypes.func.isRequired,
  currencyObject: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
