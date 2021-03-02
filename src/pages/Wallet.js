import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { exchangeFetchingAPI, expensesObject, edit, EditOrder } from '../actions/index';
import Table from '../components/table';
import Form from '../components/forms';
import './wallet.css';

const tagConst = 'Alimentação';
class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: tagConst,
    };

    this.handleChange = this.handleChange.bind(this);
    this.editState = this.editState.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  buttonSubmit() {
    const { expenses } = this.props;
    const { id } = this.state;
    expenses(this.state);
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: tagConst,
    });
  }

  buttonEdit() {
    const { editButton, expensesStore } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const expensesStoreClone = [...expensesStore];
    expensesStoreClone[id].value = value;
    expensesStoreClone[id].id = id;
    expensesStoreClone[id].description = description;
    expensesStoreClone[id].currency = currency;
    expensesStoreClone[id].method = method;
    expensesStoreClone[id].tag = tag;
    editButton(expensesStoreClone);
    this.setState({
      id: expensesStoreClone.length,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: tagConst,
    });
  }

  methodInput() {
    const { method } = this.state;
    return (
      <label htmlFor="method" className="payment-drop">
        Metodo de pagamento:
        <select
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
          id="method"
          value={ method }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  tagInput() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag" className="tag-drop">
        Tag:
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
          id="tag"
          value={ tag }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  currencyInput() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency" className="coin-drop">
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
          id="currency"
          value={ currency }
        >
          { currencies
            .map((coin) => (
              <option
                key={ coin.code }
                data-testid={ coin.code }
              >
                {coin.code}
              </option>
            ))}
        </select>
      </label>
    );
  }

  total(store) {
    if (store.length !== 0) {
      const mult = [];
      mult.push(store
        .map((order) => order.value * order.exchangeRates[order.currency].ask));
      const total = mult[0].reduce((acc, pvv) => acc + pvv);
      return <p data-testid="total-field">{`Total: ${total.toFixed(2)}`}</p>;
    }

    return <p data-testid="total-field">Total: 0</p>;
  }

  editState(id) {
    const { expensesStore, editor } = this.props;
    editor();
    const orderID = expensesStore.filter((order) => order.id === id);
    this.setState({
      id,
      value: orderID[0].value,
      description: orderID[0].description,
      currency: orderID[0].currency,
      method: orderID[0].method,
      tag: orderID[0].tag,
    });
  }

  button(bool) {
    if (bool === true) {
      return (
        <button
          type="button"
          className="button-submit"
          onClick={ () => this.buttonEdit() }
        >
          Editar despesa
        </button>
      );
    }

    return (
      <button
        type="button"
        className="button-submit"
        onClick={ () => this.buttonSubmit() }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { email, expensesStore, currencies, editBool } = this.props;
    return (
      <>
        <header className="header">
          <p data-testid="email-field">{`Email: ${email}`}</p>
          { this.total(expensesStore) }
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form className="forms">
          <Form
            onChange={ this.handleChange }
            currencies={ currencies }
            state={ this.state }
          />
          { this.button(editBool) }
        </form>
        <Table expenses={ expensesStore } edit={ this.editState } />
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expensesStore: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAPI: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
  editButton: PropTypes.func.isRequired,
  editBool: PropTypes.bool.isRequired,
  editor: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expensesStore: state.wallet.expenses,
  email: state.user.email,
  editBool: state.wallet.editor,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(
    exchangeFetchingAPI(),
  ),
  expenses: (state) => dispatch(
    expensesObject(state),
  ),
  editButton: (state) => dispatch(
    edit(state),
  ),
  editor: () => dispatch(
    EditOrder(),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
