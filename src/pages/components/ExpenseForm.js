import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense,
  fetchCoins,
  updatesExpending,
} from '../../actions';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.createAndAddExpense = this.createAndAddExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderCoinRegister = this.renderCoinRegister.bind(this);
    this.renderExpenseDescription = this.renderExpenseDescription.bind(this);
    this.renderExpenseTag = this.renderExpenseTag.bind(this);
    this.renderExpenseValue = this.renderExpenseValue.bind(this);
    this.renderPaymentMethod = this.renderPaymentMethod.bind(this);

    this.state = {
      expenseValue: 0,
      expenseDescription: '',
      expenseCoin: 'EUR',
      expenseMethod: 'Dinheiro',
      expenseTag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { requestCoinsForm } = this.props;
    requestCoinsForm();
  }

  createAndAddExpense(event) {
    event.preventDefault();
    const {
      coins,
      expenses,
      submitExpense,
      addExpenseValue,
      expending,
      requestCoinsForm,
    } = this.props;
    requestCoinsForm();
    let expenseObject;
    const {
      expenseValue,
      expenseDescription,
      expenseCoin,
      expenseMethod,
      expenseTag,
    } = this.state;
    if (expenses.length === 0) {
      expenseObject = {
        id: 0,
        value: expenseValue,
        description: expenseDescription,
        currency: expenseCoin,
        method: expenseMethod,
        tag: expenseTag,
        exchangeRates: coins,
      };
    } else {
      expenseObject = {
        id: (expenses[expenses.length - 1].id) + 1,
        value: expenseValue,
        description: expenseDescription,
        currency: expenseCoin,
        method: expenseMethod,
        tag: expenseTag,
        exchangeRates: coins,
      };
    }
    submitExpense(expenseObject);
    const expenseValueCalculated = parseFloat(expending)
        + parseFloat((coins[expenseCoin].ask * parseFloat(expenseValue)).toFixed(2));
    addExpenseValue(parseFloat(expenseValueCalculated.toFixed(2)));
    this.setState({ expenseValue: 0 });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  renderCoinRegister() {
    const { coins } = this.props;
    const { expenseCoin } = this.state;
    const coinsNameArray = Object.keys(coins).filter((coin) => coin !== 'USDT');
    return (
      <label htmlFor="expenseCoin">
        { 'Moeda de registro da despesa: ' }
        <select
          id="expenseCoin"
          name="expenseCoin"
          data-testid="currency-input"
          value={ expenseCoin }
          onChange={ this.handleChange }
        >
          { coinsNameArray.map((coin, index) => (
            <option key={ index } value={ coin } data-testid={ coin }>{ coin }</option>
          ))}
        </select>
      </label>
    );
  }

  renderExpenseDescription() {
    return (
      <label htmlFor="expense-description">
        { 'Descrição da despesa: ' }
        <input
          className="expense-description"
          name="expenseDescription"
          type="text"
          data-testid="description-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderExpenseValue() {
    const { expenseValue } = this.state;
    return (
      <label htmlFor="expense">
        { 'Valor da despesa: ' }
        <input
          name="expenseValue"
          type="text"
          data-testid="value-input"
          onChange={ this.handleChange }
          value={ expenseValue }
        />
      </label>
    );
  }

  renderPaymentMethod() {
    const { expenseMethod } = this.state;
    return (
      <label htmlFor="expenseMethod">
        { 'Método de pagamento: ' }
        <select
          id="expenseMethod"
          name="expenseMethod"
          value={ expenseMethod }
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderExpenseTag() {
    const { expenseTag } = this.state;
    return (
      <label htmlFor="expense-tag">
        { 'Categoria da despesa: '}
        <select
          id="expense-tag"
          name="expenseTag"
          data-testid="tag-input"
          value={ expenseTag }
          onChange={ this.handleChange }
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

  render() {
    return (
      <div className="expense-form-content">
        <form className="expense-form">
          { this.renderExpenseValue() }
          { this.renderExpenseDescription() }
          { this.renderCoinRegister() }
          { this.renderPaymentMethod() }
          { this.renderExpenseTag() }
          <button
            type="submit"
            onClick={ this.createAndAddExpense }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  expenses: state.wallet.expenses,
  expending: state.wallet.expending,
});

const mapDispatchToProps = (dispatch) => ({
  requestCoinsForm: () => dispatch(fetchCoins()),
  submitExpense: (expense) => dispatch(addExpense(expense)),
  addExpenseValue: (expense) => dispatch(updatesExpending(expense)),
});

ExpenseForm.propTypes = {
  coins: PropTypes.objectOf(PropTypes.object).isRequired,
  requestCoinsForm: PropTypes.func.isRequired,
  submitExpense: PropTypes.func.isRequired,
  addExpenseValue: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  expending: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
