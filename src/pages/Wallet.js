import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrencies from '../actions/walletAction';
import addRegister from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      expense: '',
      currency: '',
      paymentOption: '',
      tag: '',
      description: '',
      exchangeRates: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateRegister = this.validateRegister.bind(this);
  }

  componentDidMount() { 
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }
  

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }


  validateRegister() {
    const {id, expense, currency, paymentOption, tag, description, exchangeRates } = this.state;
    const { addRegister } = this.props;
    addRegister({id, expense, currency, paymentOption, tag, description, exchangeRates })
    this.setState({
      id: id +1,
      exchangeRates: this.props.exchangeValues,
    })
    console.log(this.props.exchangeValues);
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
    const listOfCurrencies = this.props.exchangeValues && this.props.exchangeValues.length && this.props.exchangeValues[0];
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
          {arrayOfCurrencies.map((element) => (
            <option key={element} data-testid={element} value={element}>{element}</option>
          ))}
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
      userInfos: { email },
    } = this.props;

    const { expense, currency, paymentOption, tag, description, exchangeRates } = this.state;
    console.log(expense, currency, paymentOption, tag, description, exchangeRates);

    return (
      <div>
        <header>
          TrybeWallet
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <main>
          <form className="form">
            { this.fillValueLabelHTML(expense, this.handleChange) }
            { this.fillSelectedCurrency(currency, this.handleChange) }
            { this.fillPaymentOption(paymentOption, this.handleChange) }
            { this.fillTagOption(tag, this.handleChange) }
            { this.fillDescriptionLabelHLMT(description, this.handleChange) }
            <button type="button" onClick={ this.validateRegister }>Adicionar despesa</button>
          </form>
        </main>
      </div>
    );
  }
}

Wallet.propTypes = {
  userInfos: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userInfos: state.user,
  exchangeValues: state.wallet.currencies,
  isFeching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrencies()),
  addRegister: (e) => dispatch(addRegister(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
