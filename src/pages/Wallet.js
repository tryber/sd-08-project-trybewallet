import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Creators as Actions } from '../actions';
import Header from '../components/Header';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: '',
      method: paymentMethods[0],
      tag: tags[0],
      description: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
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

  renderValueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          name="value"
          id="value"
          data-testid="value-input"
          value={ value }
          onChange={ this.onInputChange }
        />
      </label>
    );
  }

  renderCurrenciesSelect() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          id="currency"
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
      </label>
    );
  }

  renderMethodSelect() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          name="method"
          id="method"
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
      </label>
    );
  }

  renderTagSelect() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          name="tag"
          id="tag"
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
      </label>
    );
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          name="description"
          id="description"
          data-testid="description-input"
          value={ description }
          onChange={ this.onInputChange }
        />
      </label>
    );
  }

  renderTable() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        { expenses
          .map(({ description, tag, method, value, currency, exchangeRates }, index) => (
            <tr key={ index }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{(+exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button type="button" data-testid="delete-btn">Excluir</button>
              </td>
            </tr>
          ))}
      </table>
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
          this.setState({ value: '', description: '' });
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
        <Header />
        { this.renderForm() }
        { this.renderTable() }
      </>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);

Wallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  fetchQuotation: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
