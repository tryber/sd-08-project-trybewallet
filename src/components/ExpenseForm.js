import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewExpense, editExpense } from '../actions';
import getCurrencies from '../services';

const INITIAL_STATE = {
  id: undefined,
  value: '0',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
  exchangeRates: {},
};

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.getDataToState = this.getDataToState.bind(this);
    this.updateExchangeRates = this.updateExchangeRates.bind(this);
    this.inputValue = this.inputValue.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
    this.inputCurrency = this.inputCurrency.bind(this);
    this.inputMethod = this.inputMethod.bind(this);
    this.inputTag = this.inputTag.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.updateExchangeRates();
  }

  componentDidUpdate() {
    const { id } = this.props;
    const { id: emptyId } = this.state;
    if (id !== emptyId) {
      this.getDataToState();
    }
  }

  getDataToState() {
    const { id, expenses } = this.props;
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    this.setState({
      ...expenseToEdit,
    });
  }

  async updateExchangeRates() {
    const exchangeRates = await getCurrencies();

    this.setState((previousState) => ({
      ...previousState,
      exchangeRates,
    }));
  }

  inputValue() {
    const { value } = this.state;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          type="number"
          name="value"
          value={ value }
          id="value-input"
          onChange={ this.handleChange }
          data-testid="value-input"
        />
      </label>
    );
  }

  inputDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          type="text"
          name="description"
          value={ description }
          id="description-input"
          onChange={ this.handleChange }
          data-testid="description-input"
        />
      </label>
    );
  }

  inputCurrency() {
    const { currency, exchangeRates } = this.state;
    const { USDT, ...currencies } = exchangeRates;

    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          name="currency"
          value={ currency }
          id="currency-input"
          onChange={ this.handleChange }
          data-testid="currency-input"
        >
          {Object.keys(currencies).map((key) => (
            <option
              key={ key }
              value={ key }
              data-testid={ key }
            >
              { key }
            </option>
          ))}
        </select>
      </label>
    );
  }

  inputMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          name="method"
          value={ method }
          id="method-input"
          onChange={ this.handleChange }
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  inputTag() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag-input">
        Tag:
        <select
          name="tag"
          value={ tag }
          id="tag-input"
          onChange={ this.handleChange }
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  handleChange({ target }) {
    this.setState((previousState) => ({
      ...previousState,
      [target.name]: target.value,
    }));
  }

  render() {
    const { id, callback, saveExpense, updateExpense } = this.props;
    const { exchangeRates } = this.state;
    return (
      <form>
        {this.inputValue()}
        {this.inputDescription()}
        {this.inputCurrency()}
        {this.inputMethod()}
        {this.inputTag()}
        { id || id === 0
          ? (
            <button
              type="button"
              onClick={ () => {
                updateExpense(this.state);
                callback(undefined);
                this.setState({
                  ...INITIAL_STATE,
                  exchangeRates,
                });
              } }
            >
              Editar despesa
            </button>)
          : (
            <button
              type="button"
              onClick={ () => {
                this.updateExchangeRates();
                saveExpense(this.state);
                this.setState(INITIAL_STATE);
              } }
            >
              Adicionar despesa
            </button>)}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (state) => dispatch(addNewExpense(state)),
  updateExpense: (state) => dispatch(editExpense(state)),
});

ExpenseForm.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
  id: PropTypes.number,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
      ask: PropTypes.number,
    }),
  })),
  callback: PropTypes.func.isRequired,
};

ExpenseForm.defaultProps = {
  id: undefined,
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
