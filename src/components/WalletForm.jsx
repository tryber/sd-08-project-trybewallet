import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestCurrencies as requestCurrenciesAction } from '../actions/wallet';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      valueInput: '',
      descriptionInput: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderCurrenciesOptions = this.renderCurrenciesOptions.bind(this);
    this.renderPaymentOptions = this.renderPaymentOptions.bind(this);
    this.renderTagOptions = this.renderTagOptions.bind(this);
    this.renderAddButton = this.renderAddButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { requestCurrencies } = this.props;
    requestCurrencies();
  }

  handleChange({ target }) {
    const { currencies } = this.props;
    console.log(requestCurrenciesAction(), currencies);
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { id, valueInput, descriptionInput } = this.state;
  }

  renderForm() {
    const rendersFunctions = [this.renderCurrenciesOptions(),
      this.renderPaymentOptions(),
      this.renderTagOptions(),
      this.renderAddButton()];
    return (
      <div>
        <label htmlFor="valueInput">
          Valor da despesa:
          <input
            name="valueInput"
            data-testid="value-input"
            type="text"
            placeholder="Digite o valor da despesa"
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="valueInput">
          Descrição da despesa:
          <input
            name="descriptionInput"
            data-testid="description-input"
            type="text"
            placeholder="Digite uma descrição para a despesa"
            onChange={ this.handleChange }
            required
          />
        </label>
        {(
          rendersFunctions.map((render, index) => <div key={ index }>{render}</div>)
        )}
      </div>
    );
  }

  renderCurrenciesOptions() {
    const { currencies } = this.props;
    const coins = currencies.map((currency) => (
      <option key={ currency.code } data-testid={ currency.code }>
        {`${currency.code} - ${currency.name}`}
      </option>));
    return (
      <select
        name="currency"
        data-testid="currency-input"
        onChange={ this.handleChange }
      >
        {coins}
      </select>
    );
  }

  renderPaymentOptions() {
    const paymentOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <label htmlFor="methodInput">
        Método de pagamento:
        <select
          name="methodInput"
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          {paymentOptions.map((option) => <option key={ option }>{option}</option>)}
        </select>
      </label>
    );
  }

  renderTagOptions() {
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="tagInput">
        Motivo da despesa (TAG):
        <select
          name="tagInput"
          data-testid="tag-input"
        >
          {tagOptions.map((option) => <option key={ option }>{option}</option>)}
        </select>
      </label>
    );
  }

  renderAddButton() {
    return <button type="button">Adicionar despesa</button>;
  }

  render() {
    const { loading } = this.props;
    return (
      <section>{loading ? <h1>Loading...</h1> : (this.renderForm())}</section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  requestCurrencies: () => dispatch(requestCurrenciesAction()),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  requestCurrencies: PropTypes.func.isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
  loading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
