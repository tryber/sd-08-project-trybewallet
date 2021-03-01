import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrencies from '../actions/walletAction';
import addRegister from '../actions/index';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      expense: '',
      currency: 'USD',
      paymentOption: '',
      tag: '',
      description: '',
      exchangeQuote: [],
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
    const {
      id,
      expense,
      currency,
      paymentOption,
      tag,
      description,
      exchangeQuote,
    } = this.state;
    const { exchangeValues, fetchCurrencies, addRegister } = this.props;
    fetchCurrencies();
    this.setState({
      id: id + 1,
      exchangeQuote: exchangeQuote.push(exchangeValues[0]),
    });
    addRegister({
      id,
      expense,
      currency,
      paymentOption,
      tag,
      description,
      exchangeQuote,
    });
    this.setState({
      expense: '',
      currency: 'USD',
      paymentOption: '',
      tag: '',
      description: '',
      exchangeQuote: [],
    });
  }

  fillValueLabelHTML(valueNumber, handleChange) {
    return (
      <label htmlFor="valueNumber">
        Valor:
        <input
          type="number"
          name="expense"
          value={ valueNumber }
          onChange={ handleChange }
          data-testid="value-input"
        />
      </label>
    );
  }

  fillSelectedCurrency(currencyValue, onSelectedCurrency) {
    const { exchangeValues } = this.props;
    const listOfCurrencies = exchangeValues
      && exchangeValues.length
      && exchangeValues[0];
    const arrayOfCurrencies = Object.keys(listOfCurrencies);
    return (
      <label htmlFor="selectList">
        Moeda:
        <select
          name="currency"
          value={ currencyValue }
          onChange={ onSelectedCurrency }
          data-testid="currency-input"
        >
          { arrayOfCurrencies.map((element) => (
            <option key={ element } data-testid={ element } value={ element }>
              {element}
            </option>
          )) }
        </select>
      </label>
    );
  }

  fillPaymentOption(paymentType, onSelectedPayment) {
    return (
      <label htmlFor="selectList" data-testid="genre-input-label">
        Método de Pagamento:
        <select
          name="paymentOption"
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
      <label htmlFor="selectList" data-testid="genre-input-label">
        Tag:
        <select
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
    const {
      expense,
      currency,
      paymentOption,
      tag,
      description,
    } = this.state;

    return (
      <div>
        <header>
          <Header />
        </header>
        <main>
          <form className="form">
            { this.fillValueLabelHTML(expense, this.handleChange)}
            { this.fillSelectedCurrency(currency, this.handleChange) }
            { this.fillPaymentOption(paymentOption, this.handleChange) }
            { this.fillTagOption(tag, this.handleChange) }
            { this.fillDescriptionLabelHLMT(description, this.handleChange) }
            <button type="button" onClick={ this.validateRegister }>
              Adicionar despesa
            </button>
          </form>
        </main>
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
  isFeching: state.wallet.isFetching,
  allExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrencies()),
  addRegister: (e) => dispatch(addRegister(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
