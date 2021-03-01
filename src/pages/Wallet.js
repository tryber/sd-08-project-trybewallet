import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiThunk } from '../actionCreator/actionApi';
import { userWallet } from '../actions/index';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    };
    this.inputValueState = this.inputValueState.bind(this);
  }

  componentDidMount() {
    const { getApi } = this.props;
    getApi();
  }

  inputValueState(field, newValue) {
    this.setState({ [field]: newValue });
  }

  sumExpenses() {
    const { dataExpenses } = this.props;
    const sum = dataExpenses.reduce((acc, curr) => {
      const filterCurrency = curr.exchangeRates[`${curr.currency}`].ask;
      acc = Number(curr.value * filterCurrency) + acc;
      return acc;
    }, 0);
    return sum;
  }

  rendervalue() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          name="value"
          data-testid="value-input"
          onChange={ (event) => this.inputValueState('value', event.target.value) }
          min="0"
          value={ value }
        />
      </label>
    );
  }

  renderDescriptionInput() {
    return (
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ (event) => this.inputValueState(
            'description',
            event.target.value,
          ) }
        />
      </label>
    );
  }

  rendercurrency() {
    const { moedas } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          data-testid="currency-input"
          onChange={ (event) => this.inputValueState('currency', event.target.value) }
        >
          {moedas.map((element, index) => (
            <option
              data-testid={ element.code }
              key={ index }
              value={ element.code }
            >
              { element.code }
            </option>)) }
        </select>
      </label>
    );
  }

  rendercurrencyPay() {
    const payMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          name="method"
          data-testid="method-input"
          onChange={ (event) => this.inputValueState('method', event.target.value) }
        >
          <option selected name="none">
            -
          </option>
          {payMethod.map((element, index) => (
            <option
              key={ index }
            >
              { element }
            </option>)) }
        </select>
      </label>
    );
  }

  rendercurrencyTag() {
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          name="tag"
          data-testid="tag-input"
          onChange={ (event) => this.inputValueState('tag', event.target.value) }
        >
          <option selected name="">
            -
          </option>
          {tag.map((elemento, index) => (
            <option
              key={ index }
            >
              { elemento }
            </option>)) }
        </select>
      </label>
    );
  }

  renderAllTextForm() {
    return (
      <form>
        {this.rendervalue()}
        {this.renderDescriptionInput()}
        { this.rendercurrency()}
        {this.rendercurrencyPay()}
        {this.rendercurrencyTag()}
      </form>
    );
  }

  render() {
    const { showEmail, sendExpend } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            email:
            {' '}
            { showEmail }
          </span>
          <span data-testid="total-field">
            Despesa Total: R$
            {' '}
            { this.sumExpenses() }
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
        { this.renderAllTextForm() }
        <button
          type="button"
          onClick={ () => {
            sendExpend({
              value,
              description,
              currency,
              method,
              tag,
            });
            this.setState({ value: 0 });
          } }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => (
  {
    showEmail: state.user.email,
    moedas: state.wallet.currencies,
    dataExpenses: state.wallet.expenses,
  }
);
const mapDispatchToProps = (dispatch) => (
  {
    getApi: () => dispatch(fetchApiThunk()),
    sendExpend: (payload) => dispatch(userWallet(payload)),
  }
);
Wallet.propTypes = {
  showEmail: PropTypes.string.isRequired,
  getApi: PropTypes.func.isRequired,
  moedas: PropTypes.arrayOf(PropTypes.string).isRequired,
  sendExpend: PropTypes.func.isRequired,
  dataExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
