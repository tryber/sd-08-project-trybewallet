import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCurrencies, addExpense } from '../../actions';

const METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Expenses extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    requestCurrencies().then((data) => this.setState({ exchangeRates: data }));
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { id } = this.state;
    const { sendInput } = this.props;
    sendInput(this.state);
    this.setState({ id: id + 1 });
  }

  labels() {
    return (
      <div
        className="
        d-flex
        flex-column
        bg-info
        p-5
        box-radius
        shadow
        border
        border-light"
      >
        <label htmlFor="inputValue">
          Valor:
          <input
            className="form-control"
            type="number"
            data-testid="value-input"
            id="inputValue"
            name="value"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputDescrition">
          Descrição
          <input
            className="form-control"
            type="text"
            data-testid="description-input"
            id="inputDescrition"
            name="description"
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }

  button() {
    return (
      <button
        type="button"
        className="btn btn-info"
        onClick={ this.handleClick }
      >
        Adicionar despesa
      </button>
    );
  }

  selects() {
    const { exchangeRates } = this.state;
    const currencies = Object.keys(exchangeRates).filter((item) => item !== 'USDT');
    return (
      <>
        <select
          className="p-2"
          name="tag"
          id="tagsSelect"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option selected disabled>Tag</option>
          {
            TAGS
              .map((item) => <option key={ item }>{ item }</option>)
          }
        </select>
        <select
          className="p-2"
          name="method"
          id="methodSelect"
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option selected disabled>Método</option>
          {
            METHOD
              .map((item) => <option key={ item }>{ item }</option>)
          }
        </select>
        <select
          className="p-2"
          name="currency"
          id="currenciesSelect"
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          <option selected disabled>Moeda</option>
          {
            currencies
              .map((item) => <option key={ item } data-testid={ item }>{ item }</option>)
          }
        </select>
      </>
    );
  }

  render() {
    return (
      <form
        className="bg-secondary p-5  d-flex justify-content-around align-items-center"
      >
        {this.labels()}
        {this.selects()}
        {this.button()}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendInput: (value) => dispatch(addExpense(value)),
});

const mapStateToProps = (store) => ({
  fetchCurrencies: store.wallet.currencies,
});

Expenses.propTypes = {
  sendInput: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
