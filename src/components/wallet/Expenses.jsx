import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCurrencies } from '../../actions';

const METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Expenses extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    requestCurrencies().then((data) => this.setState({ currencies: data }));
  }

  handleChange({ target: { name, value } }) {
    this.setState((state) => ({ ...state, [name]: value }));
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
        onClick={ () => console.log('oi') }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { currencies } = this.state;
    return (
      <form
        className="bg-secondary p-5  d-flex justify-content-around align-items-center"
      >
        {this.labels()}
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
        {this.button()}
      </form>
    );
  }
}

export default connect(null, null)(Expenses);
