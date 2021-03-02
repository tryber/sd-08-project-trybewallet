import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrenciesAction from '../actions/walletAction';
import { addRegister as addRegisterAction } from '../actions/index';
import Header from '../components/Header';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateRegister = this.validateRegister.bind(this);
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  componentDidUpdate() {
    const { allExpenses } = this.props;
    this.addToLocalStorage(allExpenses);
  }

  addToLocalStorage(element) {
    localStorage.setItem('expenses', JSON.stringify(element));
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  validateRegister() {
    const { id, value, currency, method, tag, description } = this.state;
    const { exchangeValues, fetchCurrencies, addRegister } = this.props;
    fetchCurrencies();
    const exchangeRates = exchangeValues[0];
    this.setState({
      id: id + 1,
    });
    addRegister({
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    });
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  fillValueLabelHTML(valueNumber, handleChange) {
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          type="number"
          name="value"
          value={ valueNumber }
          onChange={ handleChange }
          data-testid="value-input"
        />
      </label>
    );
  }

  fillSelectedCurrency(currencyValue, onSelectedCurrency) {
    const { exchangeValues } = this.props;
    const listOfCurrencies = exchangeValues && exchangeValues.length && exchangeValues[0];
    const arrayOfCurrencies = Object.keys(listOfCurrencies);
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          value={ currencyValue }
          onChange={ onSelectedCurrency }
          data-testid="currency-input"
        >
          { arrayOfCurrencies.map((element) => (
            <option key={ element } data-testid={ element } value={ element }>
              { element }
            </option>
          )) }
        </select>
      </label>
    );
  }

  fillPaymentOption(paymentType, onSelectedPayment) {
    return (
      <label htmlFor="method">
        Método de Pagamento:
        <select
          id="method"
          name="method"
          value={ paymentType }
          onChange={ onSelectedPayment }
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  fillTagOption(tagType, onSelectedTag) {
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          name="tag"
          value={ tagType }
          onChange={ onSelectedTag }
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

  fillDescriptionLabelHLMT(descriptionText, handleChange) {
    return (
      <label htmlFor="descriptionText">
        Descrição:
        <input
          id="description"
          type="text"
          name="description"
          value={ descriptionText }
          onChange={ handleChange }
          data-testid="description-input"
        />
      </label>
    );
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    // const { isFetching } = this.props;
    return (
      <div>
        <header>
          <Header />
        </header>
        <main>
          <form className="form">
            { this.fillValueLabelHTML(value, this.handleChange) }
            { this.fillSelectedCurrency(currency, this.handleChange) }
            { this.fillPaymentOption(method, this.handleChange) }
            { this.fillTagOption(tag, this.handleChange) }
            { this.fillDescriptionLabelHLMT(description, this.handleChange) }
            <button type="button" onClick={ this.validateRegister }>
              Adicionar despesa
            </button>
          </form>
        </main>
        <body>
          <ExpensesTable />
        </body>
      </div>
    );
  }
}

Wallet.propTypes = {
  exchangeValues: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  addRegister: PropTypes.func.isRequired,
  allExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userInfos: state.user,
  exchangeValues: state.wallet.currencies,
  allExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
  addRegister: (e) => dispatch(addRegisterAction(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
