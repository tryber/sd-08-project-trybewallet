import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import * as Actions from '../actions';
import TableExpenses from '../Components/TableExpenses';
import '../style/wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      currencyTypes: [],
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.consultAPI = this.consultAPI.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.methodOptionsFild = this.methodOptionsFild.bind(this);
    this.tagOptionField = this.tagOptionField.bind(this);
  }

  componentDidMount() {
    this.consultAPI();
  }

  handleChange(event) {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    });
  }

  consultAPI() {
    this.setState({ isLoading: true }, async () => {
      const currencyTypes = await fetch(
        'https://economia.awesomeapi.com.br/json/all',
      )
        .then((data) => data.json())
        .then((currencies) => {
          delete currencies.USDT;
          return Object.keys(currencies);
        })
        .catch((error) => error);
      this.setState({
        currencyTypes,
        isLoading: false,
      });
    });
  }

  currencyOptionField(currency) {
    return (
      <option key={ currency } data-testid={ currency }>
        {currency}
      </option>
    );
  }

  methodOptionsFild() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        <select
          name="method"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ method }
          id="method"
          className="form-control"
          aria-label="Text input with dropdown button"
        >
          <option>Método de pagamento</option>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  tagOptionField() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
          value={ tag }
          id="tag"
          className="form-control"
          aria-label="Text input with dropdown button"
        >
          <option>Despesa</option>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  loadinMessage() {
    return <h2>Loading...</h2>;
  }

  handleClick() {
    const { value, description, currency, method, tag } = this.state;
    const { addExpense } = this.props;
    addExpense({ value, description, currency, method, tag });
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  valueField(value) {
    return (
      <label htmlFor="value">
        <input
          type="number"
          step="0.010"
          data-testid="value-input"
          name="value"
          onChange={ this.handleChange }
          value={ value }
          className="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
          placeholder="Valor"
        />
      </label>
    );
  }

  currencyField(currency, currencyTypes) {
    return (
      <label htmlFor="currency">
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ currency }
          id="currency"
          className="form-control"
          aria-label="Text input with dropdown button"
        >
          <option>Moeda</option>
          {currencyTypes.map((nameCoin) => this.currencyOptionField(nameCoin))}
        </select>
      </label>
    );
  }

  render() {
    const { currencyTypes, isLoading, currency, value, description } = this.state;
    return (
      <>
        <Header />
        {isLoading ? (
          this.loadinMessage()
        ) : (
          <form>
            {this.valueField(value)}
            <label htmlFor="description">
              <input
                type="text"
                value={ description }
                name="description"
                data-testid="description-input"
                onChange={ this.handleChange }
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
                placeholder="Descrição"
              />
            </label>
            {this.currencyField(currency, currencyTypes)}
            {this.methodOptionsFild()}
            {this.tagOptionField()}
            <span />
            <button
              type="button"
              onClick={ this.handleClick }
              className="btn btn-primary"
            >
              Adicionar despesa
            </button>
          </form>
        )}
        <TableExpenses />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (payload) => dispatch(Actions.thunkCambio(payload)),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  addExpense: PropTypes.func.isRequired,
};
