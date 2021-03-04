import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies as fetchCurrenciesAction, savedInput } from '../actions';

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  createPaymentMethods() {
    return (
      <>
        <option name="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </>
    );
  }

  createTags() {
    return (
      <>
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </>
    );
  }

  createCurrency() {
    const { currencies } = this.props;
    const currenciesFilter = Object.keys(currencies).filter((item) => item !== 'USDT');
    return currenciesFilter.map((currencie) => (
      <option
        key={ currencie }
        value={ currencie }
        data-testid={ currencie }
      >
        { currencie }
      </option>
    ));
  }

  render() {
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const { savedInputData } = this.props;
    return (
      <form>
        <label htmlFor="value">
          <input
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
            placeholder="Valor"
          />
        </label>
        <label htmlFor="currency-input">
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { this.createCurrency() }
          </select>
        </label>
        <label htmlFor="method-input">
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            { this.createPaymentMethods() }
          </select>
        </label>
        <label htmlFor="tag-input">
          <select data-testid="tag-input" name="tag" value={ tag } onChange={ this.handleChange }>
            { this.createTags() }
          </select>
        </label>
        <label htmlFor="description">
          <input
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
            placeholder="Descrição"
          />
        </label>
        <button
          type="button"
          onClick={ () => {
            savedInputData(
              { id, value, description, currency, method, tag, exchangeRates },
            );
            this.setState((prevState) => ({ id: prevState.id + 1 }));
          } }
        >
          ADICIONAR DESPESA
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  savedInputData: (data) => dispatch(savedInput(data)),
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormInput);

FormInput.propTypes = {
  savedInputData: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.instanceOf(Object).isRequired,
};
