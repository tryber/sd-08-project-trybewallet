import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';

class GetExpenses extends React.Component {
  constructor() {
    super();
    this.state = {
      getCurrencies: [],
      expenses: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
        exchangeRates: {},
      },
    };
    this.setStateCurrencies = this.setStateCurrencies.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { requestCoins } = this.props;
    requestCoins();
  }

  setStateCurrencies() {
    const { currencies } = this.props;
    const removeUSDT = currencies.filter((currency) => currency !== 'USDT');

    return (
      removeUSDT.map((item) => (
        <option key={ item } data-testid={ item }>
          { item }
        </option>
      ))
    );
  }

  eventHandler({ target: { name, value } }) {
    const { currencies } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      expenses: {
        ...prevState.expenses,
        [name]: value,
        exchangeRates: currencies,
      },
    }));
  }

  handleSubmit() {
    const { addExpense } = this.props;
    const { expenses } = this.state;
    addExpense(expenses);
  }

  valueInput() {
    const { expenses: { value } } = this.state;
    return (
      <input
        data-testid="value-input"
        placeholder="Add value"
        value={ value }
        onChange={ this.eventHandler }
        name="value"
      />
    );
  }

  descriptionInput() {
    const { expenses: { description } } = this.state;
    return (
      <input
        data-testid="description-input"
        placeholder="Add a description"
        value={ description }
        onChange={ this.eventHandler }
        name="description"
      />
    );
  }

  currencyInput() {
    const { expenses: { currency } } = this.state;
    return (
      <select
        data-testid="currency-input"
        name="currency"
        value={ currency }
        onChange={ this.eventHandler }
      >
        <option value="">Currency</option>
        {this.setStateCurrencies()}
      </select>
    );
  }

  render() {
    const { expenses: { method, tag } } = this.state;
    return (
      <div>
        <form>
          {this.valueInput()}
          {this.descriptionInput()}
          {this.currencyInput()}
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.eventHandler }
          >
            <option value="">Method Payment</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.eventHandler }
          >
            <option value="">Selecione Tag</option>
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button type="button" onClick={ this.handleSubmit }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: Object.keys(state.wallet.currencies),
  expense: state.wallet.expense,
});

const mapDispatchToProps = (dispatch) => ({
  requestCoins: () => dispatch(actions.fetchCoins()),
  addExpense: (expense) => dispatch(actions.addExpense(expense)),
});

GetExpenses.propTypes = {
  requestCoins: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GetExpenses);
