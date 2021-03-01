import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Creators as Actions } from '../actions';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const initialState = {
  value: '',
  currency: '',
  method: paymentMethods[0],
  tag: tags[0],
  description: '',
};

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.onInputChange = this.onInputChange.bind(this);
    this.renderValueInput = this.renderValueInput.bind(this);
    this.renderCurrenciesSelect = this.renderCurrenciesSelect.bind(this);
    this.renderMethodSelect = this.renderMethodSelect.bind(this);
    this.renderTagSelect = this.renderTagSelect.bind(this);
    this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies().then(() => {
      const { currencies } = this.props;
      this.setState({ currency: currencies[0] });
    });
  }

  onInputChange({ target: { name, value } }) {
    this.setState(() => ({
      [name]: value,
    }));
  }

  renderHeader() {
    const { email, expenses } = this.props;
    return (
      <>
        <div data-testid="email-field">{ email }</div>
        <div data-testid="total-field">
          { expenses.length
            ? expenses.reduce((
              total, { value, currency, exchangeRates },
            ) => {
              const exchange = (value * exchangeRates[currency].ask);
              const sum = total + exchange;
              return sum;
            }, 0)
            : 0 }
        </div>
        <div data-testid="header-currency-field">BRL</div>
      </>
    );
  }

  renderValueInput() {
    const { value } = this.state;
    return (
      <input
        name="value"
        data-testid="value-input"
        value={ value }
        onChange={ this.onInputChange }
      />
    );
  }

  renderCurrenciesSelect() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <select
        name="currency"
        data-testid="currency-input"
        value={ currency }
        onChange={ this.onInputChange }
      >
        { currencies.map((c) => (
          <option
            value={ c }
            data-testid={ c }
            key={ c }
          >
            { c }

          </option>
        ))}
      </select>
    );
  }

  renderMethodSelect() {
    const { method } = this.state;
    return (
      <select
        name="method"
        data-testid="method-input"
        value={ method }
        onChange={ this.onInputChange }
      >
        { paymentMethods.map((m) => (
          <option
            value={ m }
            key={ m }
          >
            { m }

          </option>
        ))}
      </select>
    );
  }

  renderTagSelect() {
    const { tag } = this.state;
    return (
      <select
        name="tag"
        data-testid="tag-input"
        value={ tag }
        onChange={ this.onInputChange }
      >
        { tags.map((t) => (
          <option
            value={ t }
            key={ t }
          >
            { t }

          </option>
        ))}
      </select>
    );
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <input
        name="description"
        data-testid="description-input"
        value={ description }
        onChange={ this.onInputChange }
      />
    );
  }

  renderForm() {
    const { fetchQuotation } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          fetchQuotation({ value, currency, method, tag, description });
          this.setState(initialState);
        } }
      >
        { this.renderValueInput() }
        { this.renderCurrenciesSelect() }
        { this.renderMethodSelect() }
        { this.renderTagSelect() }
        { this.renderDescriptionInput() }
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }

  render() {
    return (
      <>
        { this.renderHeader() }
        { this.renderForm() }
      </>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  fetchQuotation: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
