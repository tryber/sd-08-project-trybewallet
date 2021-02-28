import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency as fetchCurrencyAction,
  addExpense as addExpenseAction } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
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
      selectOptions: [],
    };
  }

  // Primeira chamada a API para gerar o dropdown
  componentDidMount() {
    this.getOptions();
  }

  async getOptions() {
    const { fetchCurrency } = this.props;
    await fetchCurrency();
    const { currencyObject } = this.props;

    const currencyList = Object.values(currencyObject);
    const currencyListFiltered = currencyList.filter(
      (object) => object.codein !== 'BRLT',
    );
    const options = currencyListFiltered.map(
      (currency) => currency.code,
    );

    this.setState({ selectOptions: options });
  }

  // Implementei esta função com a ajuda de https://learn.co/lessons/react-updating-state

  // A cada mudança nos inputs o state é atualizado
  inputChange = (event) => {
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
  saveExpenses = (event) => {
    const { expensesState } = this.state;
    const { addExpense } = this.props;
    fetchCurrency();
    event.preventDefault();
    console.log('save');
    addExpense(expensesState);
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
    const { selectOptions, expensesState } = this.state;
    return (
      <select
        data-testid="currency-input"
        name="currency"
        onChage={ this.inputChange }
        value={ expensesState.currency }
      >
        );
        {selectOptions.map(
          (currency) => (
            <option
              key={ currency }
              data-testid={ currency }
              value={ currency }
            >
              {currency}
            </option>),
        )}
      </select>);
  }

  renderDescription = () => {
    const { expensesState } = this.state;
    return (
      <label htmlFor="description">
        descrição da despesa
        <input
          data-testid="description-input"
          name="description"
          value={ expensesState.description }
          onChange={ this.inputChange }
        />
      </label>
    );
  }

  renderTagInput = () => (
    <label htmlFor="tag">
      Tag
      <select data-testid="tag-input" name="tag" onChange={ this.inputChange }>
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>
    </label>
  )

  renderForm = () => {
    const { expensesState } = this.state;
    return (
      <div>
        <p data-testid="total-field">
          Despesa Total:
          {this.sumValue()}
        </p>
        <form>
          <label htmlFor="value">
            Valor da despesa
            <input
              data-testid="value-input"
              name="value"
              value={ expensesState.value }
              onChange={ this.inputChange }
              // onClick={ this.fetchNewCurrency }
            />
          </label>
          {this.renderDescription()}
          <label htmlFor="currency">
            moeda
            {this.renderSelect()}
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              data-testid="method-input"
              name="method"
              onChange={ this.inputChange }
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

  render() {
    const { isFetching } = this.props;

    if (isFetching === true) {
      return (
        <div>
          <p data-testid="total-field">
            Despesa Total:
            0
          </p>
          <h2>Loading...</h2>
        </div>
      );
    }
    return this.renderForm();
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
