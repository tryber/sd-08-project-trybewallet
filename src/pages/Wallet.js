import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: '',
      currency: '',
      paymentOption: '',
      tag: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
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
    return (
      <label htmlFor="selectList" data-testid="genre-input-label">
        Moeda:
        <select
          name="currency"
          value={ currencyValue }
          onChange={ onSelectedCurrency }
          data-testid="currency-input"
        >
          <option data-testid="USD" value="USD">
            USD
          </option>
          <option data-testid="CAD" value="CAD">
            CAD
          </option>
          <option data-testid="EUR" value="EUR">
            EUR
          </option>
          <option data-testid="GBP" value="GBP">
            GBP
          </option>
          <option data-testid="ARS" value="ARS">
            ARS
          </option>
          <option data-testid="BTC" value="BTC">
            BTC
          </option>
          <option data-testid="LTC" value="LTC">
            LTC
          </option>
          <option data-testid="JPY" value="JPY">
            JPY
          </option>
          <option data-testid="CHF" value="CHF">
            CHF
          </option>
          <option data-testid="AUD" value="AUD">
            AUD
          </option>
          <option data-testid="CNY" value="CNY">CNY</option>
          <option data-testid="ILS" value="ILS">ILS</option>
          <option data-testid="ETH" value="ETH">ETH</option>
          <option data-testid="XRP" value="XRP">XRP</option>
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

    const { expense, currency, paymentOption, tag, description } = this.state;
    console.log(expense, currency, paymentOption, tag, description);

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
            <button type="button">Adicionar despesa</button>
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
});

export default connect(mapStateToProps, null)(Wallet);
